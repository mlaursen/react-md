import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";
import { CodeBlock, type CodeBlockConfigurableProps } from "./CodeBlock.js";
import { type HighlightCode, type SupportedCodeLanguage } from "./types.js";

const LANGUAGE_REGEX = /language-([a-z]+)/;

export interface BaseHighlightedCodeBlockProps
  extends CodeBlockConfigurableProps {
  children: string;
  language?: SupportedCodeLanguage;
  className?: string;
  codeProps?: HTMLAttributes<HTMLElement>;
}

export interface HighlightedCodeBlockProps
  extends BaseHighlightedCodeBlockProps {
  highlightCode: HighlightCode;
}

export function HighlightedCodeBlock(
  props: HighlightedCodeBlockProps & { language: SupportedCodeLanguage }
): ReactElement;
export function HighlightedCodeBlock(
  props: HighlightedCodeBlockProps & { className: string }
): ReactElement;
export function HighlightedCodeBlock(
  props: HighlightedCodeBlockProps & {
    language: SupportedCodeLanguage;
    className: string;
  }
): ReactElement;
export function HighlightedCodeBlock(
  props: HighlightedCodeBlockProps
): ReactElement {
  const {
    children,
    codeProps,
    language,
    className: propClassName,
    highlightCode,
    ...remaining
  } = props;

  let lang: string | undefined = language;
  let className = propClassName;
  if (!lang && propClassName) {
    [, lang] = propClassName.match(LANGUAGE_REGEX) || [];
  }
  className ??= `language-${lang}`;

  if (!lang) {
    throw new Error(
      `HighlightedCodeBlock must provide a language by the \`language\` prop or \`className="language-${language}"\``
    );
  }

  return (
    <CodeBlock {...remaining} className={className}>
      <code
        {...codeProps}
        className={cnb(className, codeProps?.className)}
        dangerouslySetInnerHTML={{
          __html: highlightCode({ code: children, lang }),
        }}
      />
    </CodeBlock>
  );
}
