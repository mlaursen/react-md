import React, { FunctionComponent } from "react";
import cn from "classnames";
import { ISVGIconProps } from "@react-md/icon";
import { Component as MaterialDesignLogo } from "./materialDesignLogo.svg";

const MaterialDesignSVGIcon: FunctionComponent<ISVGIconProps> = ({
  className,
  ...props
}) => (
  <MaterialDesignLogo
    {...props}
    className={cn("rmd-icon rmd-icon--svg", className)}
  />
);

MaterialDesignSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default MaterialDesignSVGIcon;
