"use client";

import { useEnsuredRef } from "@react-md/core/useEnsuredRef";
import {
  type KeyboardEventHandler,
  type Ref,
  type RefCallback,
  type RefObject,
} from "react";

const noop = (): void => {
  // do nothing
};

export interface FocusCodeEditorOptions {
  editorRef: RefObject<HTMLTextAreaElement | null>;
  focusEditorRef?: Ref<HTMLSpanElement>;
  onEditorKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}

export interface FocusCodeEditorImplementation {
  focusEditorRef: RefObject<HTMLSpanElement | null>;
  focusEditorProps: {
    ref: RefCallback<HTMLSpanElement>;
    onKeyDown: KeyboardEventHandler<HTMLSpanElement>;
  };
  onEditorKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
}

export function useFocusCodeEditor(
  options: FocusCodeEditorOptions
): FocusCodeEditorImplementation {
  const {
    editorRef,
    focusEditorRef: propFocusEditorRef,
    onEditorKeyDown = noop,
  } = options;
  const [focusEditorRef, focusEditorRefCallback] =
    useEnsuredRef(propFocusEditorRef);

  return {
    focusEditorRef,
    focusEditorProps: {
      ref: focusEditorRefCallback,
      onKeyDown(event) {
        const editor = editorRef.current;
        if (editor && event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          editor.focus();
          editor.setSelectionRange(0, 0);
        }
      },
    },
    onEditorKeyDown(event) {
      onEditorKeyDown(event);
      const focusEditor = focusEditorRef.current;
      if (focusEditor && event.key === "Escape") {
        event.stopPropagation();
        focusEditor.focus();
      }
    },
  };
}
