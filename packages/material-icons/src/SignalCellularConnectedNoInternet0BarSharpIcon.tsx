import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellularConnectedNoInternet0BarSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zm-2-2v2H2L22 2v6h-2V6.83L6.83 20H18z" />
      </SVGIcon>
    );
  }
);
