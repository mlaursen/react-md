import { type ReactElement } from "react";
import "server-only";
import { InlineCode, type InlineCodeProps } from "../InlineCode.jsx";
import { CodeBlock } from "./CodeBlock.js";
import { PackageManagerCode } from "./PackageManagerCode.jsx";
import { TypescriptCode } from "./TypescriptCode.jsx";
import { highlightCode } from "./highlightCode.js";
import { parseCode } from "./utils.js";

export interface HighlightedCodeBlockProps extends InlineCodeProps {
  lang?: string;
  fileName?: string;
  multiline?: boolean;
}

export function HighlightedCodeBlock(
  props: HighlightedCodeBlockProps
): ReactElement {
  const {
    children,
    lang: propLang,
    className = propLang ? `language-${propLang}` : "",
    multiline = !!propLang,
    fileName: propFileName,
    ...remaining
  } = props;

  if (!className && !multiline) {
    return <InlineCode {...remaining}>{children}</InlineCode>;
  }

  if (typeof children !== "string") {
    throw new Error("I do not support non-string code highlighting");
  }

  let lang = propLang ?? "markdown";
  if (!propLang && className) {
    [, lang] = className.match(/language-([a-z]+)/) || [];
  }

  const { code, fileName } = parseCode({
    code: children,
    lang,
    fileName: propFileName,
  });

  if (/^np(m|x)/.test(code)) {
    const pnpm = code.replace(/np(m|x)/g, "pnp$1").replace(/install/g, "add");
    const yarn = pnpm.replace(/pnpm/g, "yarn").replace(/pnpx/g, "yarn dlx");
    return (
      <PackageManagerCode
        npm={highlightCode(code, "shell")}
        pnpm={highlightCode(pnpm, "shell")}
        yarn={highlightCode(yarn, "shell")}
      />
    );
  }

  if (lang === "ts" || lang == "tsx") {
    return <TypescriptCode code={code} fileName={fileName} />;
  }

  return (
    <CodeBlock className={className} fileName={fileName}>
      <code
        {...remaining}
        className={className}
        dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }}
      />
    </CodeBlock>
  );
}
