import { type HighlightedCodeBlockWithAppBarAdditionalProps } from "@react-md/code/HighlightedCodeBlockWithAppBar";
import { type ReactElement } from "react";

import { MarkdownCode } from "./MarkdownCode.jsx";
import { TypescriptCodeBlockContainer } from "./TypescriptCodeBlockContainer.jsx";

export interface TypescriptCodeBlockProps
  extends HighlightedCodeBlockWithAppBarAdditionalProps {
  isTsx: boolean;
  jsCode: string;
  tsCode: string;
}

export function TypescriptCodeBlock(
  props: TypescriptCodeBlockProps
): ReactElement {
  const { tsCode, jsCode, isTsx, ...remaining } = props;
  const suffix = isTsx ? "x" : "";

  return (
    <TypescriptCodeBlockContainer
      {...remaining}
      tsCode={
        <MarkdownCode language={`ts${suffix}`} disableMarginTop>
          {tsCode}
        </MarkdownCode>
      }
      jsCode={
        <MarkdownCode language={`js${suffix}`} disableMarginTop>
          {jsCode}
        </MarkdownCode>
      }
    />
  );
}
