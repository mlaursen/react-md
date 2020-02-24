import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";
import { Component as MaterialDesignLogo } from "./materialDesignLogo.svg";

const MaterialDesignSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <MaterialDesignLogo
    {...props}
    className={cnb("rmd-icon rmd-icon--svg", className)}
  />
);

MaterialDesignSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default MaterialDesignSVGIcon;
