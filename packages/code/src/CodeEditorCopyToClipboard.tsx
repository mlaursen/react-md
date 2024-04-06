import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import {
  CopyToClipboard,
  type CopyToClipboardProps,
} from "./CopyToClipboard.js";

export interface CodeEditorCopyToClipboardProps extends CopyToClipboardProps {}

export function CodeEditorCopyToClipboard(
  props: CodeEditorCopyToClipboardProps
): ReactElement {
  const { className, ...remaining } = props;

  return (
    <CopyToClipboard
      {...remaining}
      className={cnb("code-editor__copy", className)}
    />
  );
}
