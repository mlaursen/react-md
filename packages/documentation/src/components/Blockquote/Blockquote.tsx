import React, { FC, HTMLAttributes } from "react";
import { cnb } from "cnbuilder";
import { Text } from "@react-md/typography";

const Blockquote: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <blockquote {...props} className={cnb("blockquote", className)}>
    <Text>{children}</Text>
  </blockquote>
);

export default Blockquote;
