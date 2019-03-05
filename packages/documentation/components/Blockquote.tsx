import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";
import { Text } from "@react-md/typography";

import "./blockquote.scss";

const Blockquote: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <blockquote {...props} className={cn("blockquote", className)}>
    <Text>{children}</Text>
  </blockquote>
);

export default Blockquote;
