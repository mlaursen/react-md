import { NullSuspense, cssUtils } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import styles from "./CodeBlock.module.scss";
import { CopyToClipboard } from "./CopyToClipboard.js";

export interface CodeBlockProps {
  /**
   * This should be the `language-tsx` string.
   */
  className: string;

  /**
   * This should be the `<code>` content.
   */
  children: ReactNode;

  /**
   * Since the `className` gets passed to the `<pre>` element, this can be used
   * to add a custom class name to the top-level container.
   */
  containerProps?: HTMLAttributes<HTMLDivElement>;

  /**
   * This is mostly used by the CodeEditor to apply `aria-hidden`
   */
  preProps?: HTMLAttributes<HTMLPreElement>;

  /**
   * This is mostly used by the CodeEditor to render the textarea within the
   * scroll container
   */
  afterPreElement?: ReactNode;

  /**
   * This should be enabled if the header or preview exists above the code
   * block.
   */
  disableMarginTop?: boolean;

  /**
   * This is mostly for the material icon/symbols copy/paste code. Allow line
   * wrapping there due to limited space and show all the code at once
   */
  lineWrap?: boolean;
}

/**
 * **Server Component**
 */
export function CodeBlock(props: CodeBlockProps): ReactElement {
  const {
    children,
    preProps,
    className,
    lineWrap,
    containerProps,
    afterPreElement,
    disableMarginTop,
  } = props;
  return (
    <div
      {...containerProps}
      className={cnb(
        styles.container,
        disableMarginTop && styles.noMarginTop,
        cssUtils({ surfaceColor: "dark", textColor: "text-primary" }),
        containerProps?.className
      )}
    >
      <div className={styles.scrollContainer}>
        <div className={styles.codeContainer}>
          <pre
            {...preProps}
            className={cnb(className, styles.pre, lineWrap && styles.lineWrap)}
          >
            {children}
          </pre>
          {afterPreElement}
        </div>
      </div>
      <NullSuspense>
        <CopyToClipboard className={styles.copyToClipboard} iconSize="small" />
      </NullSuspense>
    </div>
  );
}
