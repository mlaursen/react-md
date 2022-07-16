import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlayDisabledIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M0 0h24v24H0V0zm0 0h24v24H0V0zm11.75 11.47-.11-.11.11.11z"
          fill="none"
        />
        <path d="M8 5.19V5l11 7-2.55 1.63L8 5.19zm12 14.54-5.11-5.11L8 7.73 4.27 4 3 5.27l5 5V19l5.33-3.4 5.4 5.4L20 19.73z" />
      </SVGIcon>
    );
  }
);