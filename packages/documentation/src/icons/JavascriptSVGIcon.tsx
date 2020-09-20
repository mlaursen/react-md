// source: https://konpa.github.io/devicon/
import React, { FC } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as JavascriptSVG } from "./javascript.svg";

const JavascriptSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <JavascriptSVG
    {...props}
    className={cn("rmd-icon rmd-icon--svg", className)}
  />
);

export default JavascriptSVGIcon;
