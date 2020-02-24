import React, { FC, HTMLAttributes } from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import "./Container.scss";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

const block = bem("progress-container");

const Container: FC<ContainerProps> = ({
  className,
  children,
  inline,
  ...props
}) => {
  return (
    <div {...props} className={cnb(block({ inline }), className)}>
      {children}
    </div>
  );
};

export default Container;
