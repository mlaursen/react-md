import React, { FunctionComponent } from "react";
import { SVGIcon, ISVGIconProps } from "@react-md/icon";
import { Component as LightbulbIcon } from "./lightbulb.svg";

// this one isn't included in material icons for some reason?
const LightbulbSVGIcon: FunctionComponent<ISVGIconProps> = props => (
  <SVGIcon {...props}>
    <LightbulbIcon />
  </SVGIcon>
);

export default LightbulbSVGIcon;
