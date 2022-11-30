import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function RailwayAlertRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 11V8h7.29c-.77-2.6.21-4.61.37-4.97C2.97 2.67 2 5.02 2 7v9.5C2 18.43 3.57 20 5.5 20l-1.21.81A.649.649 0 0 0 4.65 22h10.7a.649.649 0 0 0 .36-1.19L14.5 20c1.93 0 3.5-1.57 3.5-3.5V13c-1.91 0-3.63-.76-4.89-2H4zm6 6c-.83 0-1.5-.67-1.5-1.5S9.17 14 10 14s1.5.67 1.5 1.5S10.83 17 10 17z" />
        <path d="M18 1c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm.5-2.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3z" />
      </SVGIcon>
    );
  }
);
