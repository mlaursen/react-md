import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DensitySmallOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 2h18v2H3zm0 18h18v2H3zm0-6h18v2H3zm0-6h18v2H3z" />
      </SVGIcon>
    );
  }
);
