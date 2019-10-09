import React, { FC } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as CodeSandboxIcon } from "./codesandbox.svg";

const CodeSandboxSVGIcon: FC<SVGIconProps> = ({ className, ...props }) => (
  <CodeSandboxIcon
    {...props}
    className={cn("rmd-icon rmd-icon--svg", className)}
  />
);

CodeSandboxSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default CodeSandboxSVGIcon;
