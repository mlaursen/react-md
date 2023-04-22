import type { BuiltInParserName } from "prettier";
import type { ReactElement } from "react";
import { useMemo } from "react";
import type { PrettierFormatOptions } from "src/utils/format";
import { formatInBrowser } from "src/utils/browserFormat";
import type { CodeBlockProps } from "./CodeBlock";
import { CodeBlock } from "./CodeBlock";

export interface FormattedCodeBlockProps extends CodeBlockProps {
  language:
    | "ts"
    | "tsx"
    | "js"
    | "jsx"
    | "css"
    | "scss"
    | "html"
    | "markup"
    | "markdown";
  children: string;
  options?: PrettierFormatOptions;
  stripTrailingSemi?: boolean;
}

export function FormattedCodeBlock(
  props: FormattedCodeBlockProps
): ReactElement {
  const {
    children,
    language,
    options,
    lineNumbers = false,
    stripTrailingSemi = false,
    ...remaining
  } = props;

  let parser: BuiltInParserName = "typescript";
  switch (language) {
    case "markup":
    case "markdown":
      parser = "markdown";
      break;
    case "html":
      parser = "html";
      break;
    case "css":
      parser = "css";
      break;
    case "scss":
      parser = "scss";
      break;
  }

  const code = useMemo(() => {
    try {
      const formatted = formatInBrowser(children, {
        ...options,
        parser,
      }).trim();
      if (
        parser === "typescript" &&
        stripTrailingSemi &&
        formatted.endsWith(";")
      ) {
        return formatted.slice(0, -1);
      }

      return formatted;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return children;
    }
  }, [children, options, parser, stripTrailingSemi]);

  return (
    <CodeBlock {...remaining} language={language} lineNumbers={lineNumbers}>
      {code}
    </CodeBlock>
  );
}
