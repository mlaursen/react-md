import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FlashlightOnIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 2h12v3H6zm0 5v1l2 3v11h8V11l2-3V7H6zm6 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </SVGIcon>
    );
  }
);
