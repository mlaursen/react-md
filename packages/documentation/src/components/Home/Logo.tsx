import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";

import "./Logo.scss";
import { Component as ReactMDLogo } from "./logo.svg";

const Logo: FC<HTMLAttributes<SVGSVGElement>> = ({ className }) => (
  <ReactMDLogo className={cn("react-md-logo", className)} focusable="false" />
);

export default Logo;
