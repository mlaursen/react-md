import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as HtmlSVG } from "./html.svg";

export default function HtmlIcon({
  className,
  ...props
}: SVGIconProps): ReactElement | null {
  return (
    <HtmlSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
