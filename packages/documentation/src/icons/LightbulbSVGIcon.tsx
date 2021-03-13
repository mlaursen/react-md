import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as LightbulbIcon } from "./lightbulb.svg";

// this one isn't included in material icons for some reason?
export default function LightbulbSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <LightbulbIcon
      {...props}
      className={cn("rmd-icon rmd-icon--svg", className)}
    />
  );
}

LightbulbSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};
