import type { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

export default function Container({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement {
  return (
    <div {...props} className={cn(styles.container, className)}>
      {children}
    </div>
  );
}
