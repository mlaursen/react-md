import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellularAlt2BarIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 14h3v6H5v-6zm6-5h3v11h-3V9z" />
      </SVGIcon>
    );
  }
);
