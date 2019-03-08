import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import { Text, ITextProps, TextTypes } from "@react-md/typography";
import { Omit } from "@react-md/utils";

import "./heading.scss";
import HeadingLink from "./HeadingLink";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface IHeadingProps extends Omit<ITextProps, "type"> {
  id: string;
  level: Level;
}

const Heading: FunctionComponent<IHeadingProps> = ({
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
    className={cn("heading", className)}
  >
    <HeadingLink idRef={id} />
    {children}
  </Text>
);

export default Heading;
