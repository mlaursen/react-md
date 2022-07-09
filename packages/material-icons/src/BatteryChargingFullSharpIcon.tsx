import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BatteryChargingFullSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4h-3V2h-4v2H7v18h10V4zm-6 16v-5.5H9L13 7v5.5h2L11 20z" />
      </SVGIcon>
    );
  }
);
