import { ReactElement } from "react";
import cn from "classnames";
import { Text, TextProps, TextTypes } from "@react-md/typography";

import HeadingLink from "./HeadingLink";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<TextProps, "type" | "margin"> {
  id: string;
  level: Level;
  margin?: TextProps["margin"] | "small";
}

export default function Heading({
  id,
  level,
  children,
  className,
  margin,
  ...props
}: HeadingProps): ReactElement {
  return (
    <Text
      id={id}
      {...props}
      margin={margin === "small" ? undefined : margin}
      type={`headline-${level}` as TextTypes}
      className={cn(
        "heading",
        {
          "heading--no-margin-top": margin === "bottom",
          "heading--small-margin": margin === "small",
        },
        className
      )}
    >
      <HeadingLink idRef={id} />
      {children}
    </Text>
  );
}
