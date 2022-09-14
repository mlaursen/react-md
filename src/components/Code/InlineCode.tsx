import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./InlineCode.module.scss";

export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  /**
   * @defaultValue `true`
   */
  inline?: boolean;
}

export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  function InlineCode(props, ref) {
    const { children, className, inline = true, ...remaining } = props;

    return (
      <code
        ref={ref}
        {...remaining}
        className={cnb(styles.code, inline && styles.inline, className)}
      >
        {children}
      </code>
    );
  }
);
