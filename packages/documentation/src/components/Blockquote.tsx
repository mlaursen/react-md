import type { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";

import styles from "./Blockquote.module.scss";

export default function Blockquote({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLQuoteElement>): ReactElement {
  return (
    <blockquote {...props} className={cn(styles.blockquote, className)}>
      {children}
    </blockquote>
  );
}
