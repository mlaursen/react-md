import React, { FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";

import "./logo.scss";
import { Component as ReactMDLogo } from "./logo.svg";

const Logo: FunctionComponent<HTMLAttributes<SVGSVGElement>> = ({
  className,
}) => (
  <ReactMDLogo className={cn("react-md-logo", className)} focusable="false" />
);

export default Logo;
