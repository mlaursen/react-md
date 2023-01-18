import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalWifiStatusbarConnectedNoInternet2TwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          fillOpacity=".3"
          d="M17 11.21V8h5.92C19.97 5.51 16.16 4 12 4 7.31 4 3.07 5.9 0 8.98l4.23 4.24A10.96 10.96 0 0 1 17 11.21z"
        />
        <path d="M4.23 13.22 12 21l5-5.01v-4.78a10.96 10.96 0 0 0-12.77 2.01zM19 18h2v2h-2zm0-8h2v6h-2z" />
      </SVGIcon>
    );
  }
);
