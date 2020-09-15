import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as TsSVG } from "./ts.svg";

export default function TsIcon({
  className,
  ...props
}: SVGIconProps): ReactElement | null {
  return (
    <TsSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
