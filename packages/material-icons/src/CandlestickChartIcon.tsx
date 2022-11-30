import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CandlestickChartIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zm10 4h-2V4h-2v4h-2v7h2v5h2v-5h2z" />
      </SVGIcon>
    );
  }
);
