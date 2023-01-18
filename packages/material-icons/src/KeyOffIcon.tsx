import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function KeyOffIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M16.91 14.09 17 14l2 2 4-4.04L21 10h-8.17l4.08 4.09zM3.98 6.81A6.012 6.012 0 0 0 1 12c0 3.31 2.69 6 6 6 2.21 0 4.15-1.2 5.18-2.99l7.59 7.59 1.41-1.41L2.81 2.81 1.39 4.22l2.59 2.59zm5.93 5.93A3.015 3.015 0 0 1 7 15c-1.65 0-3-1.35-3-3 0-1.4.97-2.58 2.26-2.91l3.65 3.65z" />
    </SVGIcon>
  );
});
