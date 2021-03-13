import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as GithubIcon } from "./github.svg";

export default function GithubSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <GithubIcon
      {...props}
      className={cn("rmd-icon rmd-icon--svg", className)}
    />
  );
}

GithubSVGIcon.defaultProps = {
  role: "presentation",
  focusable: "false",
};
