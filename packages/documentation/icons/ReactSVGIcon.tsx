import React, { FC } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as ReactLogo } from "./reactLogo.svg";

import "./ReactSVGIcon.scss";

const ReactSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
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
