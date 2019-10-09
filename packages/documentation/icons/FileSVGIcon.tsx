// source: https://ionicons.com/
import React, { FC } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as FileSVG } from "./file.svg";

const FileSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <FileSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
);

export default FileSVGIcon;
