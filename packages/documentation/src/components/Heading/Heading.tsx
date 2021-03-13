import React, { ReactElement } from "react";
import cn from "classnames";
import { Text, TextProps, TextTypes } from "@react-md/typography";

import HeadingLink from "./HeadingLink";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<TextProps, "type"> {
  id: string;
  level: Level;
}

export default function Heading({
  id,
  level,
  children,
  className,
  ...props
}: HeadingProps): ReactElement {
  return (
    <Text
      id={id}
      {...props}
      type={`headline-${level}` as TextTypes}
      className={cn("heading", className)}
    >
      <HeadingLink idRef={id} />
      {children}
    </Text>
  );
}
