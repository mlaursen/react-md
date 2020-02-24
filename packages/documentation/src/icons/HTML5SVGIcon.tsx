// source: https://konpa.github.io/devicon/
import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";

import { Component as HTML5SVG } from "./html5.svg";

const HTML5SVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <HTML5SVG {...props} className={cnb("rmd-icon rmd-icon--svg", className)} />
);

export default HTML5SVGIcon;
