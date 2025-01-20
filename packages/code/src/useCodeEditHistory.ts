"use client";

import { useEnsuredRef } from "@react-md/core/useEnsuredRef";
import {
  type ChangeEventHandler,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type Ref,
  type RefCallback,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

const noop = (): void => {
  // do nothing
};

export interface CodeEditTextAction {
  value: string;
  selectionStart?: number;
  selectionEnd?: number;
}

export type CodeEditAction = CodeEditTextAction | "undo" | "redo";

export interface CodeEditActionStack extends Required<CodeEditTextAction> {
  timestamp: number;
}

export interface CodeEditHistory {
  stack: CodeEditActionStack[];
  offset: number;
}

interface HandleKeydownOptions extends Required<CodeEditTextAction> {
  event: KeyboardEvent<HTMLTextAreaElement>;
  update: (editAction: CodeEditTextAction) => void;
}

const TAB_TEXT = " ".repeat(2);
const TAB_SIZE = TAB_TEXT.length;

// navigator.platform is deprecated and navigator.userAgentData is still
// experimental, so just use the user agent. If someone spoofs it, it's their
// fault.
const isWindows =
  typeof window !== "undefined" && /Win/i.test(window.navigator.userAgent);
const isMacLike =
  typeof window !== "undefined" &&
  /Mac|iPhone|iPod|iPad/i.test(window.navigator.userAgent);

const getLinesTo = (value: string, end: number): readonly string[] =>
  value.substring(0, end).split("\n");

const isUndoEvent = (event: KeyboardEvent): boolean => {
  const { key, metaKey, ctrlKey } = event;
  return key === "z" && (isMacLike ? metaKey : ctrlKey);
};

const isRedoEvent = (event: KeyboardEvent): boolean => {
  const { shiftKey, ctrlKey, altKey, metaKey, key } = event;
  if (altKey) {
    return false;
  }

  if (isMacLike) {
    return metaKey && shiftKey && key === "z";
  }

  if (isWindows) {
    return ctrlKey && key === "y";
  }

  return ctrlKey && shiftKey && key === "z";
};

const handleTabKey = (options: HandleKeydownOptions): void => {
  const { value, selectionStart, selectionEnd, update, event } = options;
  const { shiftKey } = event;
  event.preventDefault();
  event.stopPropagation();

  const lines = value.split("\n");
  const linesBeforeCaret = getLinesTo(value, selectionStart);
  const startLine = linesBeforeCaret.length - 1;
  const endLine = getLinesTo(value, selectionEnd).length - 1;
  const startLineText = linesBeforeCaret[startLine];
  const isInSelection = (index: number): boolean =>
    index >= startLine && index <= endLine;

  if (shiftKey) {
    // dedent(?) current or selected lines
    const nextValue = lines
      .map((line, i) => {
        if (isInSelection(i) && line.startsWith(TAB_TEXT)) {
          return line.substring(TAB_SIZE);
        }
        return line;
      })
      .join("\n");

    if (value !== nextValue) {
      update({
        value: nextValue,
        selectionStart: startLineText.startsWith(TAB_TEXT)
          ? selectionStart - TAB_SIZE
          : selectionStart,
        selectionEnd: selectionEnd - (value.length - nextValue.length),
      });
    }
  } else if (selectionStart !== selectionEnd) {
    // indent selected lines
    const nextValue = lines
      .map((line, i) => {
        if (isInSelection(i)) {
          return TAB_TEXT + line;
        }

        return line;
      })
      .join("\n");

    update({
      value: nextValue,
      selectionStart: /\S/.test(startLineText)
        ? selectionStart + TAB_SIZE
        : selectionStart,
      selectionEnd: selectionEnd + TAB_SIZE * (endLine - startLine + 1),
    });
  } else {
    const caretPosition = selectionStart + TAB_SIZE;
    const nextValue =
      value.substring(0, selectionStart) +
      TAB_TEXT +
      value.substring(selectionEnd);
    update({
      value: nextValue,
      selectionStart: caretPosition,
      selectionEnd: caretPosition,
    });
  }
};

const handleWrappingCharacters = (options: HandleKeydownOptions): void => {
  const { value, selectionStart, selectionEnd, event, update } = options;
  let characters: readonly [leading: string, trailing: string] | undefined;
  switch (event.key) {
    case "(":
    case ")":
      characters = ["(", ")"];
      break;
    case "[":
    case "]":
      characters = ["[", "]"];
      break;
    case "{":
    case "}":
      characters = ["{", "}"];
      break;
    case "`":
    case '"':
    case "'":
      characters = [event.key, event.key];
      break;
  }

  if (selectionStart === selectionEnd || !characters) {
    return;
  }

  event.preventDefault();
  const nextValue =
    value.substring(0, selectionStart) +
    characters[0] +
    value.substring(selectionStart, selectionEnd) +
    characters[1] +
    value.substring(selectionEnd);

  update({
    value: nextValue,
    selectionStart,
    selectionEnd: selectionEnd + characters.length,
  });
};

export interface CodeEditHistoryOptions {
  ref?: Ref<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  defaultCode: string;
}

export interface CodeEditHistoryImplementation {
  code: string;
  editorRef: RefObject<HTMLTextAreaElement>;
  editorProps: {
    ref: RefCallback<HTMLTextAreaElement>;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  };
  setCode: (nextCode: string) => void;
  editCode: (action: CodeEditAction) => void;
  updateTextArea: (action: CodeEditTextAction) => void;
}

export function useCodeEditHistory(
  options: CodeEditHistoryOptions
): CodeEditHistoryImplementation {
  const { ref, onChange = noop, onKeyDown = noop, defaultCode } = options;

  const [code, setCode] = useState(defaultCode);
  const [editorRef, editorRefCallback] = useEnsuredRef(ref);
  const editHistoryRef = useRef<CodeEditHistory>();
  if (!editHistoryRef.current) {
    editHistoryRef.current = {
      stack: [
        {
          value: defaultCode,
          timestamp: Date.now(),
          selectionEnd: 0,
          selectionStart: 0,
        },
      ],
      offset: -1,
    };
  }

  const updateTextArea = useCallback(
    (action: CodeEditTextAction) => {
      const { value, selectionStart = 0, selectionEnd = 0 } = action;
      const editor = editorRef.current;
      if (!editor) {
        return;
      }

      editor.value = value;
      editor.setSelectionRange(selectionStart, selectionEnd);
      setCode(action.value);
    },
    [editorRef]
  );
  const editCode = useCallback(
    (action: CodeEditAction) => {
      const editHistory = editHistoryRef.current;
      if (!editHistory) {
        return;
      }

      const timestamp = Date.now();
      if (action === "undo" || action === "redo") {
        const { offset, stack } = editHistory;
        const nextOffset = offset + (action === "redo" ? 1 : -1);
        const nextAction = stack[nextOffset];
        if (nextAction) {
          editHistory.offset = Math.min(
            Math.max(nextOffset, 0),
            stack.length - 1
          );
          updateTextArea(nextAction);
        }
      } else {
        const { value, selectionStart = 0, selectionEnd = 0 } = action;

        editHistory.stack.push({
          value,
          timestamp,
          selectionStart,
          selectionEnd,
        });
        editHistory.offset++;
        updateTextArea(action);
      }
    },
    [updateTextArea]
  );

  return {
    code,
    editorRef,
    editorProps: {
      ref: editorRefCallback,
      onChange(event) {
        onChange(event);
        const { value, selectionStart, selectionEnd } = event.currentTarget;

        editCode({
          value,
          selectionEnd,
          selectionStart,
        });
      },
      onKeyDown(event) {
        onKeyDown(event);
        const { key, currentTarget } = event;
        const { value, selectionStart, selectionEnd } = currentTarget;
        const options: HandleKeydownOptions = {
          event,
          value,
          selectionEnd,
          selectionStart,
          update: editCode,
        };

        if (key === "Tab") {
          handleTabKey(options);
        } else if (isUndoEvent(event)) {
          editCode("undo");
        } else if (isRedoEvent(event)) {
          editCode("redo");
        } else {
          handleWrappingCharacters(options);
        }
      },
    },
    setCode: useCallback(
      (nextCode) => {
        editCode({ value: nextCode });
      },
      [editCode]
    ),
    editCode,
    updateTextArea,
  };
}
