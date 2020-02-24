import React, { FC, HTMLAttributes } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import "./Container.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  stacked?: boolean;
}

const block = bem("tooltip-example-container");

const Container: FC<ContainerProps> = ({
  className,
  children,
  stacked,
  ...props
}) => (
  <div {...props} className={cnb(block({ stacked }), className)}>
    {children}
  </div>
);

Container.defaultProps = {
  stacked: false,
};

export default Container;
