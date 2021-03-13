import React, { ReactElement } from "react";
import cn from "classnames";
import { SVGIconProps } from "@react-md/icon";
import { Component as ReactLogo } from "./reactLogo.svg";

import styles from "./ReactSVGIcon.module.scss";

export default function ReactSVGIcon({
  className,
  ...props
}: SVGIconProps): ReactElement {
  return (
    <ReactLogo
      {...props}
      className={cn("rmd-icon rmd-icon--svg", styles.logo, className)}
    />
  );
}

ReactSVGIcon.defaultProps = {
  role: "presentation",
  focusable: "false",
};
