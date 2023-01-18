import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellularNoSimSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 3h-9L7.95 5.06 19 16.11zm-15.21.74L2.38 5.15 5 7.77V21h13.23l1.62 1.62 1.41-1.41z" />
      </SVGIcon>
    );
  }
);
