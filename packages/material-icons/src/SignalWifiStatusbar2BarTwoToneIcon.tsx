import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalWifiStatusbar2BarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          fillOpacity=".3"
          d="M19.77 13.22 24 8.98A16.88 16.88 0 0 0 12 4C7.31 4 3.07 5.9 0 8.98l4.23 4.24C6.22 11.23 8.97 10 12 10s5.78 1.23 7.77 3.22z"
        />
        <path d="M19.77 13.22C17.78 11.23 15.03 10 12 10s-5.78 1.23-7.77 3.22L12 21l7.77-7.78z" />
      </SVGIcon>
    );
  }
);
