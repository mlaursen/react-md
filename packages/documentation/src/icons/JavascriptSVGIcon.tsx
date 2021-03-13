// source: https://konpa.github.io/devicon/
import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as JavascriptSVG } from "./javascript.svg";

export default function JavascriptSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <JavascriptSVG
      {...props}
      className={cn("rmd-icon rmd-icon--svg", className)}
    />
  );
}
