import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellular1BarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fillOpacity=".3" d="M2 22h20V2L2 22z" />
        <path d="M12 12 2 22h10V12z" />
      </SVGIcon>
    );
  }
);
