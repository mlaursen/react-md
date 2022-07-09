import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FiberSmartRecordIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M24 24H0V0h24v24z" fill="none" />
        <circle cx="9" cy="12" r="8" />
        <path d="M17 4.26v2.09a5.99 5.99 0 0 1 0 11.3v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z" />
      </SVGIcon>
    );
  }
);
