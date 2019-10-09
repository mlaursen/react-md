// source: https://konpa.github.io/devicon/
import React, { FC } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as TypescriptSVG } from "./typescript.svg";

const TypescriptSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <TypescriptSVG
    {...props}
    className={cn("rmd-icon rmd-icon--svg", className)}
  />
);

export default TypescriptSVGIcon;
