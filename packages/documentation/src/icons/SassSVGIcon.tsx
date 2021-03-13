// source: https://konpa.github.io/devicon/
import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as SassSVG } from "./sass.svg";

export default function SassSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <SassSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
