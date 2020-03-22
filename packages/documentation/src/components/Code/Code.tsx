import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  inline?: boolean;
  noWrap?: boolean;
}

export default forwardRef<HTMLElement, CodeProps>(function Code(
  { inline = true, noWrap = false, className, children, ...props },
  ref
) {
  return (
    <code
      {...props}
      ref={ref}
      className={cn(
        "code",
        {
          "code--inline": inline,
          "code--no-wrap": inline && noWrap,
        },
        className
      )}
    >
      {children}
    </code>
  );
});
