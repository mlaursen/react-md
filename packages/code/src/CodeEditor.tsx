"use client";

import { type PropsWithRef } from "@react-md/core/types";
import { type TypographyProps } from "@react-md/core/typography/Typography";
import { bem } from "@react-md/core/utils/bem";
import { cnb } from "cnbuilder";
import {
  type ReactElement,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";

import { FocusCodeEditor } from "./FocusCodeEditor.js";
import {
  HighlightedCodeBlock,
  type HighlightedCodeBlockProps,
} from "./HighlightedCodeBlock.js";
import { type SupportedCodeLanguage } from "./types.js";

const styles = bem("code-editor");

export interface CodeEditorProps extends HighlightedCodeBlockProps {
  language: SupportedCodeLanguage;
  children: string;
  editorProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  focusEditorProps?: PropsWithRef<TypographyProps, HTMLSpanElement>;
  focusEditorChildren?: ReactNode;
}

/**
 * @example
 */
export function CodeEditor(props: CodeEditorProps): ReactElement {
  const {
    children,
    codeProps,
    editorProps,
    focusEditorProps,
    containerProps,
    fixedChildren,
    scrollContainerProps,
    focusEditorChildren,
    ...remaining
  } = props;

  return (
    <HighlightedCodeBlock
      {...remaining}
      codeProps={{
        ...codeProps,
        className: cnb(styles("code"), codeProps?.className),
      }}
      containerProps={{
        ...containerProps,
        className: cnb(styles(), containerProps?.className),
      }}
      scrollContainerProps={{
        ...scrollContainerProps,
        tabIndex: 0,
        className: cnb(
          styles("scroll-container", {
            hoverable: !editorProps?.readOnly && !editorProps?.disabled,
          }),
          scrollContainerProps?.className
        ),
      }}
      afterPreElement={
        <textarea
          aria-label="Code Editor"
          spellCheck={false}
          autoCorrect="none"
          autoComplete="none"
          autoCapitalize="none"
          tabIndex={-1}
          {...editorProps}
          className={cnb(styles("textarea"), editorProps?.className)}
        />
      }
      fixedChildren={
        <>
          <FocusCodeEditor {...focusEditorProps}>
            {focusEditorChildren}
          </FocusCodeEditor>
          {fixedChildren}
        </>
      }
    >
      {children}
    </HighlightedCodeBlock>
  );
}
