import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AreaChartSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 13v7h18v-1.5l-9-7L8 17l-5-4zm0-6 4 3 5-7 5 4h4v8.97l-9.4-7.31-3.98 5.48L3 10.44V7z" />
      </SVGIcon>
    );
  }
);
