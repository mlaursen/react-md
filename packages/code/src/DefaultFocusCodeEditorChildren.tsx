import { type ReactElement } from "react";

import { InlineCode } from "./InlineCode.js";

export function DefaultFocusCodeEditorChildren(): ReactElement {
  return (
    <>
      Press <InlineCode as="kbd">Enter</InlineCode> to start editing.
    </>
  );
}
