import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";

import "./container.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

const block = bem("progress-container");
const Container: FunctionComponent<ContainerProps> = ({
  className,
  children,
  inline,
  ...props
}) => {
  return (
    <div {...props} className={cn(block({ inline }), className)}>
      {children}
    </div>
  );
};

export default Container;
