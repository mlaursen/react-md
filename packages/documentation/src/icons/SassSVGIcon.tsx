// source: https://konpa.github.io/devicon/
import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";

import { Component as SassSVG } from "./sass.svg";

const SassSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <SassSVG {...props} className={cnb("rmd-icon rmd-icon--svg", className)} />
);

export default SassSVGIcon;
