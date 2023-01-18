import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalWifiStatusbarConnectedNoInternetTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 18h2v2h-2zm0-8h2v6h-2z" />
        <path
          d="M17 8h5.92C19.97 5.51 16.16 4 12 4 7.31 4 3.07 5.9 0 8.98L12 21l5-5.01V8z"
          opacity=".3"
        />
      </SVGIcon>
    );
  }
);
