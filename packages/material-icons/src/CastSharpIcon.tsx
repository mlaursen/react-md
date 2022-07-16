import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function CastSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
      <path d="M23 3H1v5h2V5h18v14h-7v2h9V3zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2a9 9 0 0 1 9 9h2c0-6.08-4.93-11-11-11z" />
    </SVGIcon>
  );
});