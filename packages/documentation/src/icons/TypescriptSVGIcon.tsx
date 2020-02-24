// source: https://konpa.github.io/devicon/
import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";

import { Component as TypescriptSVG } from "./typescript.svg";

const TypescriptSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <TypescriptSVG
    {...props}
    className={cnb("rmd-icon rmd-icon--svg", className)}
  />
);

export default TypescriptSVGIcon;
