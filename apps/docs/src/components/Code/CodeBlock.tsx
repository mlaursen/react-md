import { AppBarTitle, NullSuspense, cssUtils } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { CopyToClipboard } from "../CopyToClipboard.jsx";
import styles from "./CodeBlock.module.scss";
import { CodeBlockHeader } from "./CodeBlockHeader.jsx";

export interface CodeBlockProps {
  fileName?: string;
  className: string;
  children: ReactNode;
  header?: ReactNode;
  headerProps?: HTMLAttributes<HTMLDivElement>;
  preProps?: HTMLAttributes<HTMLPreElement>;
  afterPreElement?: ReactNode;
  disableMarginTop?: boolean;
}

/**
 * RSC-safe component used to render everything in a code block. Supports things
 * like:
 * - rendering a header with actions above the code (change language, copy,
 *   create sandbox, etc)
 * - copy the code to the clipboard
 * - add line numbers
 */
export function CodeBlock(props: CodeBlockProps): ReactElement {
  const {
    className,
    children,
    fileName,
    header,
    headerProps,
    preProps,
    afterPreElement,
    disableMarginTop,
  } = props;
  const isHeader = !!(header || fileName);

  return (
    <>
      {isHeader && (
        <CodeBlockHeader {...headerProps}>
          {header}
          {fileName && (
            <AppBarTitle type="subtitle-2" as="span">
              {fileName}
            </AppBarTitle>
          )}
        </CodeBlockHeader>
      )}
      <div
        className={cnb(
          styles.container,
          (isHeader || disableMarginTop) && styles.noMarginTop,
          cssUtils({ surfaceColor: "dark", textColor: "text-primary" })
        )}
      >
        <div className={styles.scrollContainer}>
          <div className={styles.codeContainer}>
            <pre {...preProps} className={cnb(className, styles.pre)}>
              {children}
            </pre>
            {afterPreElement}
          </div>
        </div>
        <NullSuspense>
          <CopyToClipboard
            className={styles.copyToClipboard}
            iconSize="small"
          />
        </NullSuspense>
      </div>
    </>
  );
}
