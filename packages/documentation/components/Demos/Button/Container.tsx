import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

import "./Container.scss";

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={cn("button-container", className)}>
    {children}
  </div>
);

export default Container;
