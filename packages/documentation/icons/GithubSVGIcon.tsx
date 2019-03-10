import React, { FunctionComponent } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as GithubIcon } from "./github.svg";

const GithubSVGIcon: FunctionComponent<SVGIconProps> = ({
  className,
  ...props
}) => (
  <GithubIcon {...props} className={cn("rmd-icon rmd-icon--svg", className)} />
);

GithubSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default GithubSVGIcon;
