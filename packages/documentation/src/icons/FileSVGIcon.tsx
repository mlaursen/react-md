// source: https://ionicons.com/
import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";

import { Component as FileSVG } from "./file.svg";

const FileSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <FileSVG {...props} className={cnb("rmd-icon rmd-icon--svg", className)} />
);

export default FileSVGIcon;
