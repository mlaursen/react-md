import "server-only";

import { type ReactElement } from "react";
import { CodeBlock } from "./CodeBlock.js";
import { InlineCode, type InlineCodeProps } from "../InlineCode.jsx";
import { PackageManagerCode } from "./PackageManagerCode.jsx";
import { TypescriptCode } from "./TypescriptCode.jsx";
import { highlightCode } from "./highlightCode.js";
import { getLineCount } from "./utils.js";

const NO_LINES_LANGUAGES = new Set(["markup", "markdown", "shell"]);

export interface HighlightedCodeBlockProps extends InlineCodeProps {
  lang?: string;
  fileName?: string;
  multiline?: boolean;
  containerClassName?: string;
}

export function HighlightedCodeBlock(
  props: HighlightedCodeBlockProps
): ReactElement {
  const {
    children,
    lang: propLang,
    className = propLang ? `language-${propLang}` : "",
    multiline = !!propLang,
    containerClassName,
    fileName,
    ...remaining
  } = props;

  if (!className && !multiline) {
    return <InlineCode {...remaining}>{children}</InlineCode>;
  }

  if (typeof children !== "string") {
    throw new Error("I do not support non-string code highlighting");
  }

  let lang = propLang ?? "markdown";
  let lines: number | undefined;
  if (!propLang && className) {
    [, lang] = className.match(/language-([a-z]+)/) || [];
  }

  let code = children;
  if (lang === "diff") {
    code = code.replace(/(\r?\n)+$/, "");
  } else {
    code = code.trim();
  }
  if (!NO_LINES_LANGUAGES.has(lang)) {
    lines = getLineCount(code);
  }

  if (code.startsWith("npm")) {
    const pnpm = code.replace(/npm/g, "pnpm").replace(/install/g, "add");
    const yarn = pnpm.replace(/pnpm/g, "yarn");
    return (
      <PackageManagerCode
        npm={highlightCode(code, "shell")}
        pnpm={highlightCode(pnpm, "shell")}
        yarn={highlightCode(yarn, "shell")}
      />
    );
  }

  if (lang === "ts" || lang == "tsx") {
    return (
      <TypescriptCode
        code={code}
        fileName={fileName}
        containerClassName={containerClassName}
      />
    );
  }

  return (
    <CodeBlock
      lines={lines}
      className={className}
      fileName={fileName}
      containerClassName={containerClassName}
    >
      <code
        {...remaining}
        className={className}
        dangerouslySetInnerHTML={{ __html: highlightCode(code, lang) }}
      />
    </CodeBlock>
  );
}
