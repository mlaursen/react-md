import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BrowserNotSupportedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 6v10.5l2 2V4H6.5l2 2zM3.22 3.32 1.95 4.59 3 5.64V20h14.36l2.06 2.06 1.27-1.27L3.22 3.32zM15 18H5V7.64L15.36 18H15z" />
      </SVGIcon>
    );
  }
);
