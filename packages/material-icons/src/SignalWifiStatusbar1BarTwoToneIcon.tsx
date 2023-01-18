import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalWifiStatusbar1BarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          fillOpacity=".3"
          d="M17.65 15.34 24 8.98A16.88 16.88 0 0 0 12 4C7.31 4 3.07 5.9 0 8.98l6.35 6.36C7.8 13.89 9.79 13 12 13s4.2.89 5.65 2.34z"
        />
        <path d="M17.65 15.34C16.2 13.89 14.21 13 12 13s-4.2.89-5.65 2.34L12 21l5.65-5.66z" />
      </SVGIcon>
    );
  }
);
