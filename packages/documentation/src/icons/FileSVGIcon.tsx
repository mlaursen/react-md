// source: https://ionicons.com/
import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as FileSVG } from "./file.svg";

export default function FileSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <FileSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
