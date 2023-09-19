import { NullSuspense } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import styles from "./CodeBlock.module.scss";
import { CopyToClipboard } from "./CopyToClipboard.jsx";
import { LineNumbers } from "./LineNumbers.jsx";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  children: ReactNode;
  containerClassName?: string;
}

export function CodeBlock(props: CodeBlockProps): ReactElement {
  const { className, lines, containerClassName, children, ...remaining } =
    props;

  return (
    <div {...remaining} className={cnb(styles.container, containerClassName)}>
      <NullSuspense>
        <CopyToClipboard className={styles.copy} />
      </NullSuspense>
      <pre
        className={cnb(styles.pre, !!lines && styles.lineNumbers, className)}
      >
        {lines && <LineNumbers lines={lines} />}
        {children}
      </pre>
    </div>
  );
}
