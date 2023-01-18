import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CallMissedOutgoingTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 10.41V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41l9 9z" />
      </SVGIcon>
    );
  }
);
