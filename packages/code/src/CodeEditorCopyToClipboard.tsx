import { type RequireAtLeastOne } from "@react-md/core/types";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import {
  CopyToClipboard,
  type CopyToClipboardProps,
} from "./CopyToClipboard.js";

export interface CodeEditorCopyToClipboardProps extends CopyToClipboardProps {}

export function CodeEditorCopyToClipboard(
  props: RequireAtLeastOne<
    CodeEditorCopyToClipboardProps,
    "copyText" | "getCopyText"
  >
): ReactElement {
  const { className, ...remaining } = props;

  return (
    <CopyToClipboard
      {...remaining}
      className={cnb("code-editor__copy", className)}
    />
  );
}
