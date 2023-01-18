import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ChargingStationSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m14.5 11-3 6v-4h-2l3-6v4h2zM5 1h14v22H5V1zm2 5v12h10V6H7z" />
      </SVGIcon>
    );
  }
);
