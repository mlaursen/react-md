"use client";

import { useAddToast } from "@react-md/core/snackbar/ToastManagerProvider";
import { type RequireAtLeastOne } from "@react-md/core/types";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import {
  CopyToClipboard,
  type CopyToClipboardProps,
} from "./CopyToClipboard.js";

export type CodeEditorCopyToClipboardProps = CopyToClipboardProps;

export function CodeEditorCopyToClipboard(
  props: RequireAtLeastOne<
    CodeEditorCopyToClipboardProps,
    "copyText" | "getCopyText"
  >
): ReactElement {
  const { className, ...remaining } = props;
  const addToast = useAddToast();

  return (
    <CopyToClipboard
      onCopied={() => {
        addToast({ children: "Copied to clipboard!" });
      }}
      {...remaining}
      className={cnb("code-editor__copy", className)}
    />
  );
}
