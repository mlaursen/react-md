import { ReactElement } from "react";
import cn from "classnames";
import {
  Typography,
  TypographyProps,
  TypographyType,
} from "@react-md/typography";

import HeadingLink from "./HeadingLink";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<TypographyProps, "type" | "margin"> {
  id: string;
  level: Level;
  margin?: TypographyProps["margin"] | "small";
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
    <Typography
      id={id}
      {...props}
      margin={margin === "small" ? undefined : margin}
      type={`headline-${level}` as TypographyType}
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
    </Typography>
  );
}
