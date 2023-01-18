import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BubbleChartSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <circle cx="7.2" cy="14.4" r="3.2" />
        <circle cx="14.8" cy="18" r="2" />
        <circle cx="15.2" cy="8.8" r="4.8" />
      </SVGIcon>
    );
  }
);
