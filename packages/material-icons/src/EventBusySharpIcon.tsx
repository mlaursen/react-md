import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EventBusySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m9.31 17 2.44-2.44L14.19 17l1.06-1.06-2.44-2.44 2.44-2.44L14.19 10l-2.44 2.44L9.31 10l-1.06 1.06 2.44 2.44-2.44 2.44L9.31 17zM21 3h-3V1h-2v2H8V1H6v2H3.01L3 21h18V3zm-2 16H5V8h14v11z" />
      </SVGIcon>
    );
  }
);
