import { type HighlightedCodeBlockWithAppBarAdditionalProps } from "@react-md/code/HighlightedCodeBlockWithAppBar";
import { transformTsToJs } from "docs-generator/utils/transformTsToJs";
import { type ReactElement } from "react";

import { MarkdownCode } from "./MarkdownCode.jsx";
import { TypescriptCodeBlock } from "./TypescriptCodeBlock.jsx";

export interface TransformTypescriptCodeBlockProps extends HighlightedCodeBlockWithAppBarAdditionalProps {
  isTsx: boolean;
  code: string;
}

export async function TransformTypescriptCodeBlock(
  props: TransformTypescriptCodeBlockProps
): Promise<ReactElement> {
  const { isTsx, code, ...remaining } = props;
  const jsCode = await transformTsToJs(code, "");
  if (jsCode === code) {
    return (
      <MarkdownCode
        {...remaining}
        language={`ts${isTsx ? "x" : ""}`}
        disableMarginTop
      >
        {code}
      </MarkdownCode>
    );
  }

  return (
    <TypescriptCodeBlock
      {...remaining}
      isTsx={isTsx}
      jsCode={jsCode}
      tsCode={code}
    />
  );
}
