import React, { FC, HTMLAttributes } from "react";
import { cnb } from "cnbuilder";

import "./Container.scss";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={cnb("menu-container", className)}>
    {children}
  </div>
);

export default Container;
