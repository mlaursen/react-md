import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";

import "./container.scss";

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("avatar-container", className)} {...props}>
    {children}
  </div>
);

export default Container;
