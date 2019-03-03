import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import { Text, ITextProps } from "@react-md/typography";
import { Omit } from "@react-md/utils";

import "./heading.scss";
import HeadingLink from "./HeadingLink";

export interface IHeadingProps extends Omit<ITextProps, "type"> {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
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
    type={`headline-${level}`}
    className={cn("heading", className)}
  >
    <HeadingLink idRef={id} />
    {children}
  </Text>
);

export default Heading;
