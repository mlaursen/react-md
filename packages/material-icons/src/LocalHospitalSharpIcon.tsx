import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LocalHospitalSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 3H3.01L3 21h18V3zm-3 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
      </SVGIcon>
    );
  }
);
