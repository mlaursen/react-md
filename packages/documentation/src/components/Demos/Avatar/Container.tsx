import type { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

export default function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
}
