import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellular3BarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fillOpacity=".3" d="M2 22h20V2L2 22z" />
        <path d="M17 7 2 22h15V7z" />
      </SVGIcon>
    );
  }
);
