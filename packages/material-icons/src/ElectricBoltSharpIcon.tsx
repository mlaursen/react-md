import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ElectricBoltSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 2 2.5 13 13 14l-5 7 1 1 12.5-11L11 10l5-7z" />
      </SVGIcon>
    );
  }
);
