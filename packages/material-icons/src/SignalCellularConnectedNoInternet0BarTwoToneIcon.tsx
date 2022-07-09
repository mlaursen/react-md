import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellularConnectedNoInternet0BarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 8V2L2 22h16V8h4z" fillOpacity=".3" />
        <path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z" />
      </SVGIcon>
    );
  }
);
