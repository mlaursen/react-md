import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";

import "./container.scss";

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn("menu-container", className)}>
      {children}
    </div>
  );
};

export default Container;
