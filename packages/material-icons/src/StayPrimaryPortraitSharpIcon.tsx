import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function StayPrimaryPortraitSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5.01 1v22H19V1H5.01zM17 19H7V5h10v14z" />
      </SVGIcon>
    );
  }
);