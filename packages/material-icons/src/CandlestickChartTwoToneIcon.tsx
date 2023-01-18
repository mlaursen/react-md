import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CandlestickChartTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9V4zm0 12H7V8h2v8z" />
        <path d="M7 8h2v8H7zm8 2h2v3h-2z" opacity=".3" />
        <path d="M19 8h-2V4h-2v4h-2v7h2v5h2v-5h2V8zm-2 5h-2v-3h2v3z" />
      </SVGIcon>
    );
  }
);
