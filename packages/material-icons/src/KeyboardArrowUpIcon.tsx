import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardArrowUpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </SVGIcon>
    );
  }
);
