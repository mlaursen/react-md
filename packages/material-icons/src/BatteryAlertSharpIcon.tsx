import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BatteryAlertSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4h-3V2h-4v2H7v18h10V4zm-4 14h-2v-2h2v2zm0-4h-2V9h2v5z" />
      </SVGIcon>
    );
  }
);
