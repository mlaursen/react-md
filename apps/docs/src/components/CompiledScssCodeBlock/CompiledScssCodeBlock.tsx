import { CodeBlockFileName } from "@react-md/code/CodeBlockFileName";
import { type ReactElement } from "react";

import { MarkdownCode } from "../MarkdownCode.jsx";
import {
  CompiledScssCodeBlockContainer,
  type CompiledScssCodeBlockContainerProps,
} from "./CompiledScssCodeBlockContainer.jsx";

export interface CompiledScssCodeBlockProps extends Omit<
  CompiledScssCodeBlockContainerProps,
  "css" | "scss"
> {
  css: string;
  scss: string;
}

export function CompiledScssCodeBlock(
  props: Readonly<CompiledScssCodeBlockProps>
): ReactElement {
  const { css, scss, fileName, ...remaining } = props;
  return (
    <CompiledScssCodeBlockContainer
      {...remaining}
      fileName={fileName && <CodeBlockFileName>{fileName}</CodeBlockFileName>}
      css={
        <MarkdownCode language="css" disableMarginTop>
          {css}
        </MarkdownCode>
      }
      scss={
        <MarkdownCode language="scss" disableMarginTop>
          {scss}
        </MarkdownCode>
      }
    />
  );
}
