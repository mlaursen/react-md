import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cnb } from "cnbuilder";

import "./Container.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => (
    <div
      {...props}
      className={cnb("transition-container", className)}
      ref={ref}
    >
      {children}
    </div>
  )
);
