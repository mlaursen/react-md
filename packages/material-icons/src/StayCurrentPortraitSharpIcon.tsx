import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function StayCurrentPortraitSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 1.01 5.01 1v22H19V1.01zM17 19H7V5h10v14z" />
      </SVGIcon>
    );
  }
);
