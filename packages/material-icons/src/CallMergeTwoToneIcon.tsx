import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CallMergeTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m16.997 20.41-3.408-3.407 1.4-1.407 3.41 3.408zM5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8H11v5.59z" />
      </SVGIcon>
    );
  }
);
