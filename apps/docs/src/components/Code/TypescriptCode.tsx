import { convertTsToJs } from "@/utils/convertTsToJs.js";
import { type ReactElement } from "react";
import "server-only";
import { CodeBlock } from "./CodeBlock.jsx";
import { TypescriptOrJavascriptCode } from "./TypescriptOrJavascriptCode.jsx";
import { highlightCode } from "./highlightCode.js";

export interface TypescriptCodeProps {
  code: string;
  fileName?: string;
}

export async function TypescriptCode(
  props: TypescriptCodeProps
): Promise<ReactElement> {
  const { code, fileName } = props;
  const jsCode = await convertTsToJs(code);

  if (code === jsCode) {
    const className = "language-tsx";
    return (
      <CodeBlock className={className} fileName={fileName}>
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: highlightCode(code, "tsx") }}
        />
      </CodeBlock>
    );
  }

  return (
    <TypescriptOrJavascriptCode
      tsHtml={highlightCode(code, "tsx")}
      jsHtml={highlightCode(jsCode, "jsx")}
    />
  );
}
