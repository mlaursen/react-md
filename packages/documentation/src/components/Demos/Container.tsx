import React, { FC, HTMLAttributes } from "react";
import { cnb } from "cnbuilder";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={cnb("demo__container", className)}>
    {children}
  </div>
);

export default Container;
