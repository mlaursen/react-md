import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SquareTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 5h14v14H5z" opacity=".3" />
        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" />
      </SVGIcon>
    );
  }
);