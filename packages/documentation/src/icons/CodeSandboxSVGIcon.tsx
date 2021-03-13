import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as CodeSandboxIcon } from "./codesandbox.svg";

export default function CodeSandboxSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <CodeSandboxIcon
      {...props}
      className={cn("rmd-icon rmd-icon--svg", className)}
    />
  );
}

CodeSandboxSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};
