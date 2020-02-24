import React, { FC, HTMLAttributes } from "react";
import { cnb } from "cnbuilder";

import "./Logo.scss";
import { Component as ReactMDLogo } from "./logo.svg";

const Logo: FC<HTMLAttributes<SVGSVGElement>> = ({ className }) => (
  <ReactMDLogo className={cnb("react-md-logo", className)} focusable="false" />
);

export default Logo;
