// source: https://konpa.github.io/devicon/
import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as HTML5SVG } from "./html5.svg";

export default function HTML5SVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <HTML5SVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
