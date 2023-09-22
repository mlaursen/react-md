import "server-only";

import { convertTsToJs } from "@/utils/convertTsToJs.js";
import { type ReactElement } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import { TypescriptOrJavascriptCode } from "./TypescriptOrJavascriptCode.jsx";
import { highlightCode } from "./highlightCode.js";
import { getLineCount } from "./utils.js";

export interface TypescriptCodeProps {
  code: string;
  fileName?: string;
}

export async function TypescriptCode(
  props: TypescriptCodeProps
): Promise<ReactElement> {
  const { code, fileName } = props;
  const jsCode = await convertTsToJs(code);
  const tsLines = getLineCount(code);

  if (code === jsCode) {
    const className = "language-tsx";
    return (
      <CodeBlock lines={tsLines} className={className} fileName={fileName}>
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: highlightCode(code, "tsx") }}
        />
      </CodeBlock>
    );
  }

  return (
    <TypescriptOrJavascriptCode
      tsLines={tsLines}
      tsHtml={highlightCode(code, "tsx")}
      jsLines={getLineCount(jsCode)}
      jsHtml={highlightCode(jsCode, "jsx")}
    />
  );
}
