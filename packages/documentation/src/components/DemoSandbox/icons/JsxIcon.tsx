import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as JsxSVG } from "./jsx.svg";

export default function JsxIcon({
  className,
  ...props
}: SVGIconProps): ReactElement | null {
  return (
    <JsxSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
