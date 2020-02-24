import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";
import { Component as LightbulbIcon } from "./lightbulb.svg";

// this one isn't included in material icons for some reason?
const LightbulbSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <LightbulbIcon
    {...props}
    className={cnb("rmd-icon rmd-icon--svg", className)}
  />
);

LightbulbSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default LightbulbSVGIcon;
