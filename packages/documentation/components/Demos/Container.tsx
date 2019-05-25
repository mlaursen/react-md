import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={cn("demo__container", className)}>
    {children}
  </div>
);

export default Container;
