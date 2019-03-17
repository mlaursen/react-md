import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";

import "./container.scss";

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={cn("list-container", className)}>
    {children}
  </div>
);

export default Container;
