import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardDoubleArrowUpOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z" />
        <path d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z" />
      </SVGIcon>
    );
  }
);
