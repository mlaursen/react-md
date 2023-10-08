import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";

import styles from "./InlineCode.module.scss";

export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  disableTicks?: boolean;
}

/**
 * This is used to render inline code that is surrounded by backticks.
 */
export function InlineCode(props: InlineCodeProps): ReactElement {
  const { className, disableTicks, ...remaining } = props;
  return (
    <code
      {...remaining}
      className={cnb(
        styles.container,
        !disableTicks && styles.ticked,
        className
      )}
    />
  );
}
