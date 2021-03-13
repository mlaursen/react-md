import React, { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";
import { Text } from "@react-md/typography";

export default function Blockquote({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement {
  return (
    <blockquote {...props} className={cn("blockquote", className)}>
      <Text>{children}</Text>
    </blockquote>
  );
}
