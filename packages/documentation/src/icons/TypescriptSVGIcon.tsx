// source: https://konpa.github.io/devicon/
import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as TypescriptSVG } from "./typescript.svg";

export default function TypescriptSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <TypescriptSVG
      {...props}
      className={cn("rmd-icon rmd-icon--svg", className)}
    />
  );
}
