import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as ScssSVG } from "./scss.svg";

export default function ScssIcon({
  className,
  ...props
}: SVGIconProps): ReactElement | null {
  return (
    <ScssSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
