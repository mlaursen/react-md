import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CallMissedOutgoingIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="m3 8.41 9 9 7-7V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41z" />
      </SVGIcon>
    );
  }
);
