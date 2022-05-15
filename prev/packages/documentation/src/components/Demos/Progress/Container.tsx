import type { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

export default function Container({
  className,
  children,
  inline,
  ...props
}: ContainerProps): ReactElement {
  return (
    <div
      {...props}
      className={cn(
        styles.container,
        {
          [styles.inline]: inline,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
