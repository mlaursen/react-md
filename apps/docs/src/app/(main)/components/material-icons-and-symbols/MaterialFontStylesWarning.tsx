import { type ReactElement } from "react";

import { Blockquote } from "@/components/Blockquote.js";

import { CopyCode } from "./CopyCode.js";

export function MaterialFontStylesWarning(): ReactElement {
  return (
    <>
      <Blockquote theme="warning">
        You might need to add the following CSS to force the material symbol to
        use the correct font size.
      </Blockquote>
      <CopyCode lang="scss">
        {`@use "@react-md/core";

.rmd-icon[class*="material-"] {
  @include core.icon-use-var(font-size, size);
}
`}
      </CopyCode>
    </>
  );
}
