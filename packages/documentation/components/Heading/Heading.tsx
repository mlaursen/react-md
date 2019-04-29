import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Text, TextProps, TextTypes } from "@react-md/typography";
import { Omit } from "@react-md/utils";

import HeadingLink from "./HeadingLink";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<TextProps, "type"> {
  id: string;
  level: Level;
  noMarginTop?: boolean;
}

const Heading: FunctionComponent<HeadingProps> = ({
  id,
  level,
  children,
  className,
  noMarginTop,
  ...props
}) => (
  <Text
    id={id}
    {...props}
    type={`headline-${level}` as TextTypes}
    className={cn(
      "heading",
      { "heading--no-margin-top": noMarginTop },
      className
    )}
  >
    <HeadingLink idRef={id} />
    {children}
  </Text>
);

export default Heading;
