import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BatteryStdSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4h-3V2h-4v2H7v18h10V4z" />
      </SVGIcon>
    );
  }
);
