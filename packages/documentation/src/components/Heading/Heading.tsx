import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { Text, TextProps, TextTypes } from "@react-md/typography";

import HeadingLink from "./HeadingLink";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<TextProps, "type"> {
  id: string;
  level: Level;
}

const Heading: FC<HeadingProps> = ({
  id,
  level,
  children,
  className,
  ...props
}) => (
  <Text
    id={id}
    {...props}
    type={`headline-${level}` as TextTypes}
    className={cnb("heading", className)}
  >
    <HeadingLink idRef={id} />
    {children}
  </Text>
);

export default Heading;
