import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

import "./container.scss";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={cn("list-container", className)}>
    {children}
  </div>
);

export default Container;
