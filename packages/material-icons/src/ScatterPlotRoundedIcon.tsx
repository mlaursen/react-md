import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

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
