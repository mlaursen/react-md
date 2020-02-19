import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import "./Container.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => (
    <div {...props} className={cn("transition-container", className)} ref={ref}>
      {children}
    </div>
  )
);
