"use client";
import { useCodeLanguageContext } from "@/providers/CodeLanguageProvider.jsx";
import { type ReactElement } from "react";
import { CodeBlock, type CodeBlockProps } from "./CodeBlock.jsx";

export interface HighlightedTypescriptCode {
  ts: string;
  js: string;
}

export interface TypescriptCodeProps
  extends HighlightedTypescriptCode,
    Partial<CodeBlockProps> {}

export function TypescriptCode(props: HighlightedTypescriptCode): ReactElement {
  const { ts, js, ...remaining } = props;
  const { codeLanguage } = useCodeLanguageContext();
  const className = `language-${codeLanguage}x`;
  const isTs = codeLanguage === "ts";

  return (
    <CodeBlock {...remaining} className={className} disableMarginTop>
      <code
        className={className}
        dangerouslySetInnerHTML={{ __html: isTs ? ts : js }}
      />
    </CodeBlock>
  );
}
