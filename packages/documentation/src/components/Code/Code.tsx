import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cnb } from "cnbuilder";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  inline?: boolean;
}

export default forwardRef<HTMLElement, CodeProps>(function Code(
  { inline = true, className, children, ...props },
  ref
) {
  return (
    <code
      {...props}
      ref={ref}
      className={cnb("code", { "code--inline": inline }, className)}
    >
      {children}
    </code>
  );
});
