import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={cn("demo__container", className)}>
    {children}
  </div>
);

export default Container;
