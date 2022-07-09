import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ExposureNeg1Icon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none" />
        <path d="M4 11v2h8v-2H4zm15 7h-2V7.38L14 8.4V6.7L18.7 5h.3v13z" />
      </SVGIcon>
    );
  }
);
