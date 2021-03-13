import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as MaterialDesignLogo } from "./materialDesignLogo.svg";

export default function MaterialDesignSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <MaterialDesignLogo
      {...props}
      className={cn("rmd-icon rmd-icon--svg", className)}
    />
  );
}

MaterialDesignSVGIcon.defaultProps = {
  role: "presentation",
  focusable: "false",
};
