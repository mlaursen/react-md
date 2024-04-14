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
