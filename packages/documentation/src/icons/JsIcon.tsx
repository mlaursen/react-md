import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as JsSVG } from "./js.svg";

export default function JsIcon({
  className,
  ...props
}: SVGIconProps): ReactElement | null {
  return (
    <JsSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
