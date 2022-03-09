import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import cn from "classnames";

import styles from "./Container.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default forwardRef<HTMLDivElement, Props>(function Container(
  { children, className, ...props },
  ref
) {
  return (
    <div {...props} className={cn(styles.container, className)} ref={ref}>
      {children}
    </div>
  );
});
