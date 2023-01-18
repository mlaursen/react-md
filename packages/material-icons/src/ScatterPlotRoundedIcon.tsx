import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ScatterPlotRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <circle cx="7" cy="14" r="3" />
        <circle cx="11" cy="6" r="3" />
        <circle cx="16.6" cy="17.6" r="3" />
      </SVGIcon>
    );
  }
);
