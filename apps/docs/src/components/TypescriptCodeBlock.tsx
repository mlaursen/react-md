import { type ReactElement } from "react";

import { MarkdownCode } from "./MarkdownCode.jsx";
import {
  TypescriptCodeBlockContainer,
  type TypescriptCodeBlockContainerProps,
} from "./TypescriptCodeBlockContainer.jsx";

export interface TypescriptCodeBlockProps
  extends TypescriptCodeBlockContainerProps {
  isTsx: boolean;
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
