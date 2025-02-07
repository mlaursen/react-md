import { CodeEditorCopyToClipboard } from "@react-md/code/CodeEditorCopyToClipboard";
import {
  HighlightedCodeBlockWithAppBar,
  type HighlightedCodeBlockWithAppBarProps,
} from "@react-md/code/HighlightedCodeBlockWithAppBar";
import { InlineCode, type InlineCodeProps } from "@react-md/code/InlineCode";
import { highlightCode } from "@react-md/code/prismjs/highlight";
import { type ReactElement } from "react";

export interface MarkdownCodeProps
  extends InlineCodeProps,
    Omit<HighlightedCodeBlockWithAppBarProps, "children" | "highlightCode"> {
  multiline?: boolean;
}

export function MarkdownCode(props: MarkdownCodeProps): ReactElement {
  const { children, className, language, multiline, ...remaining } = props;
  if (!className && !language && !multiline) {
    return <InlineCode {...remaining}>{children}</InlineCode>;
  }

  if (typeof children !== "string") {
    throw new Error("Code must be string");
  }

  if (process.env.NODE_ENV !== "production") {
    const KNOWN_PROPS = new Set<string>([
      "fileName",
      "lineWrap",
      "containerProps",
      "disableScroll",
      "disableMarginTop",
      "appBarProps",
      "appBarChildren",
    ]);
    const invalid = new Set<string>();
    Object.keys(remaining).forEach((key) => {
      if (!KNOWN_PROPS.has(key)) {
        invalid.add(key);
      }
    });

    if (invalid.size) {
      throw new Error(`Unsupported code props:
${[...invalid].map((name) => `- ${name}`).join("\n")}

Supports props are:
${[...KNOWN_PROPS].map((name) => `- ${name}`).join("\n")}
`);
    }
  }

  return (
    <HighlightedCodeBlockWithAppBar
      {...remaining}
      language={language}
      className={className as string}
      highlightCode={highlightCode}
      fixedChildren={<CodeEditorCopyToClipboard copyText={children} />}
    >
      {children}
    </HighlightedCodeBlockWithAppBar>
  );
}
