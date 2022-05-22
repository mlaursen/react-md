import { cnb } from "cnbuilder";
import type { ReactElement, SVGAttributes } from "react";

import styles from "./SVGIcon.module.scss";

export type SVGIconProps = SVGAttributes<SVGSVGElement>;

export function SVGIcon(props: SVGIconProps): ReactElement {
  const {
    "aria-hidden": ariaHidden = true,
    focusable = false,
    viewBox = "0 0 24 24",
    className,
    children,
    ...remaining
  } = props;
  return (
    <svg
      {...remaining}
      aria-hidden={ariaHidden}
      viewBox={viewBox}
      focusable={focusable}
      className={cnb(styles.svg, className)}
    >
      {children}
    </svg>
  );
}
