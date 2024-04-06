// https://github.com/react-simple-code-editor/react-simple-code-editor/blob/86129bb4394bdad0e5cc1a735b32ce747383325b/src/index.tsx
import { type UseStateSetter } from "react-md";
import {
  useRef,
  useState,
  type ChangeEventHandler,
  type KeyboardEvent,
  type KeyboardEventHandler,
} from "react";

interface EditAction {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

interface EditHistory {
  stack: (EditAction & { timestamp: number })[];
  offset: number;
}

interface HandleKeydownOptions extends EditAction {
  event: KeyboardEvent<HTMLTextAreaElement>;
  shiftKey: boolean;
  update(editAction: EditAction): void;
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
  const { value, selectionStart, selectionEnd, shiftKey, update, event } =
    options;
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

export interface CodeEditorTextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
}

export interface CodeEditorProvidedProps {
  code: string;
  textAreaProps: CodeEditorTextAreaProps;
}

export interface CodeEditorResult extends CodeEditorProvidedProps {
  setCode: UseStateSetter<string>;
}

export function useCodeEditor(defaultCode: string): CodeEditorResult {
  const [code, setCode] = useState(defaultCode);
  const editHistoryRef = useRef<EditHistory | null>(null);
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
  const editHistory = editHistoryRef.current;

  return {
    code,
    setCode,
    textAreaProps: {
      value: code,
      onChange(event) {
        const { currentTarget } = event;
        const { value, selectionStart, selectionEnd } = currentTarget;
        const updateTextArea = (action: EditAction): void => {
          currentTarget.value = action.value;
          currentTarget.setSelectionRange(
            action.selectionStart,
            action.selectionEnd
          );
          setCode(action.value);
        };

        const update = (action: EditAction): void => {
          const timestamp = Date.now();

          editHistory.stack.push({ ...action, timestamp });
          editHistory.offset++;
          updateTextArea(action);
        };

        update({
          value,
          selectionEnd,
          selectionStart,
        });
        // setCode(value);
      },
      onKeyDown(event) {
        const { key, metaKey, ctrlKey, shiftKey, currentTarget } = event;
        const { value, selectionStart, selectionEnd } = currentTarget;
        const updateTextArea = (action: EditAction): void => {
          currentTarget.value = action.value;
          currentTarget.setSelectionRange(
            action.selectionStart,
            action.selectionEnd
          );
          setCode(action.value);
        };

        const update = (action: EditAction): void => {
          const timestamp = Date.now();

          editHistory.stack.push({ ...action, timestamp });
          editHistory.offset++;
          updateTextArea(action);
        };

        const redoOrUndo = (type: "undo" | "redo"): void => {
          const { offset, stack } = editHistory;
          const nextOffset = offset + (type === "redo" ? 1 : -1);
          const action = stack[nextOffset];
          if (action) {
            editHistory.offset = Math.min(
              Math.max(nextOffset, 0),
              stack.length - 1
            );
            updateTextArea(action);
          }
        };

        const options: HandleKeydownOptions = {
          value,
          selectionEnd,
          selectionStart,
          update,
          shiftKey,
          event,
        };

        if (key === "Escape") {
          event.stopPropagation();
          currentTarget.blur();
        } else if (key === "Tab") {
          handleTabKey(options);
        } else if (key === "z" && (isMacLike ? metaKey : ctrlKey)) {
          redoOrUndo("undo");
        } else if (isRedoEvent(event)) {
          redoOrUndo("redo");
        } else {
          handleWrappingCharacters(options);
        }
      },
    },
  };
}
