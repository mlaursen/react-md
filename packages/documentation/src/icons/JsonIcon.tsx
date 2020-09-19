import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";

import { Component as JsonSVG } from "./json.svg";

export default function JsonIcon({
  className,
  ...props
}: SVGIconProps): ReactElement | null {
  return (
    <JsonSVG {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
  );
}
