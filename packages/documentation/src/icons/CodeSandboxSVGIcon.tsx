import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { SVGIconProps } from "@react-md/icon";
import { Component as CodeSandboxIcon } from "./codesandbox.svg";

const CodeSandboxSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <CodeSandboxIcon
    {...props}
    className={cnb("rmd-icon rmd-icon--svg", className)}
  />
);

CodeSandboxSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default CodeSandboxSVGIcon;
