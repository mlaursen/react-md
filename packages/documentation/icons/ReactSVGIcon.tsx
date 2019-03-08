import React, { FunctionComponent } from "react";
import cn from "classnames";
import { ISVGIconProps } from "@react-md/icon";
import { Component as ReactLogo } from "./reactLogo.svg";

import "./react-svg-icon.scss";

const ReactSVGIcon: FunctionComponent<ISVGIconProps> = ({
  className,
  ...props
}) => (
  <ReactLogo
    {...props}
    className={cn("rmd-icon rmd-icon--svg react-logo", className)}
  />
);

ReactSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default ReactSVGIcon;
