import React, { FC, HTMLAttributes } from "react";
import { cnb } from "cnbuilder";

import "./Container.scss";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cnb("avatar-container", className)} {...props}>
    {children}
  </div>
);

export default Container;
