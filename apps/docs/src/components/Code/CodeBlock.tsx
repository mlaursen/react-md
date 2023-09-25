import { AppBarTitle, NullSuspense } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import styles from "./CodeBlock.module.scss";
import { CodeBlockHeader } from "./CodeBlockHeader.jsx";
import { CopyToClipboard } from "../CopyToClipboard.jsx";
import { LineNumbers } from "./LineNumbers.jsx";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  fileName?: string;
  beforeAddon?: ReactNode;
  afterAddon?: ReactNode;
  children: ReactNode;
  containerClassName?: string;
  header?: ReactNode;
  headerProps?: HTMLAttributes<HTMLDivElement>;
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
    lines,
    containerClassName,
    children,
    beforeAddon,
    afterAddon,
    fileName,
    header,
    headerProps,
    disableMarginTop,
    ...remaining
  } = props;
  const isHeader = !!(header || fileName);

  return (
    <div {...remaining} className={cnb(styles.container, containerClassName)}>
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
      {beforeAddon}
      <div className={styles.preContainer}>
        <pre
          className={cnb(
            styles.pre,
            !!lines && styles.lineNumbers,
            className,
            (isHeader || disableMarginTop) && styles.noMarginTop
          )}
        >
          <NullSuspense>
            <CopyToClipboard className={styles.copy} />
          </NullSuspense>
          {lines && <LineNumbers lines={lines} />}
          {children}
        </pre>
      </div>
      {afterAddon}
    </div>
  );
}
