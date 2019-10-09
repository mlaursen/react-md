import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

import "./Container.scss";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div {...props} className={cn("app-bar-container", className)}>
    {children}
  </div>
);

export default Container;
