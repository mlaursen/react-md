import type { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  stacked?: boolean;
}

export default function Container({
  className,
  children,
  stacked = false,
  ...props
}: ContainerProps): ReactElement {
  return (
    <div
      {...props}
      className={cn(
        styles.container,
        {
          [styles.stacked]: stacked,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
