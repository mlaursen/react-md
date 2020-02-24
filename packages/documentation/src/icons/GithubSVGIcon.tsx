import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";
import { Component as GithubIcon } from "./github.svg";

const GithubSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <GithubIcon {...props} className={cnb("rmd-icon rmd-icon--svg", className)} />
);

GithubSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default GithubSVGIcon;
