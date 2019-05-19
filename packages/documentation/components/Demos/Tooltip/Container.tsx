import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";

import "./container.scss";
import { bem } from "@react-md/theme";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  stacked?: boolean;
}

const block = bem("tooltip-example-container");

const Container: FunctionComponent<ContainerProps> = ({
  className,
  children,
  stacked,
  ...props
}) => (
  <div {...props} className={cn(block({ stacked }), className)}>
    {children}
  </div>
);

Container.defaultProps = {
  stacked: false,
};

export default Container;
