import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function StayCurrentLandscapeSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M1 19h22V5H1v14zM19 7v10H5V7h14z" />
      </SVGIcon>
    );
  }
);
