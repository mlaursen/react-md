import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./InlineCode.module.scss";

export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  /**
   * @defaultValue `true`
   */
  inline?: boolean;

  /**
   * Set this to `true` to render as a `<kbd>` instead of `<code>`.
   *
   * @defaultValue `false`
   */
  kbd?: boolean;
}

export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  function InlineCode(props, ref) {
    const { children, className, inline = true, kbd, ...remaining } = props;

    const Component = kbd ? "kbd" : "code";

    return (
      <Component
        ref={ref}
        {...remaining}
        className={cnb(styles.code, inline && styles.inline, className)}
      >
        {children}
      </Component>
    );
  }
);
