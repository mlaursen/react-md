import { type ReactElement, type ReactNode } from "react";

import {
  CodeBlockAppBar,
  type CodeBlockAppBarProps,
} from "./CodeBlockAppBar.js";
import { CodeBlockFileName } from "./CodeBlockFileName.js";
import {
  HighlightedCodeBlock,
  type HighlightedCodeBlockProps,
} from "./HighlightedCodeBlock.js";
import { type SupportedCodeLanguage } from "./types.js";

export interface HighlightedCodeBlockWithAppBarAdditionalProps {
  fileName?: string;
  appBarProps?: CodeBlockAppBarProps;
  appBarChildren?: ReactNode;
}

export interface HighlightedCodeBlockWithAppBarProps
  extends HighlightedCodeBlockProps,
    HighlightedCodeBlockWithAppBarAdditionalProps {}

export function HighlightedCodeBlockWithAppBar(
  props: HighlightedCodeBlockWithAppBarProps & {
    language: SupportedCodeLanguage;
  }
): ReactElement;
export function HighlightedCodeBlockWithAppBar(
  props: HighlightedCodeBlockWithAppBarProps & { className: string }
): ReactElement;
export function HighlightedCodeBlockWithAppBar(
  props: HighlightedCodeBlockWithAppBarProps & {
    language: SupportedCodeLanguage;
    className: string;
  }
): ReactElement;
export function HighlightedCodeBlockWithAppBar(
  props: HighlightedCodeBlockWithAppBarProps
): ReactElement {
  const { fileName, appBarProps, appBarChildren, ...remaining } = props;
  return (
    <>
      {!!(fileName || appBarProps || appBarChildren) && (
        <CodeBlockAppBar {...appBarProps}>
          {fileName && <CodeBlockFileName>{fileName}</CodeBlockFileName>}
          {appBarChildren}
        </CodeBlockAppBar>
      )}
      <HighlightedCodeBlock
        disableMarginTop
        {...(remaining as HighlightedCodeBlockProps & { className: string })}
      />
    </>
  );
}
