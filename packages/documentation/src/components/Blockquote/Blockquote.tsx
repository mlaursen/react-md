import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";
import { Text } from "@react-md/typography";

const Blockquote: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <blockquote {...props} className={cn("blockquote", className)}>
    <Text>{children}</Text>
  </blockquote>
);

export default Blockquote;
