import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardDoubleArrowDownOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z" />
        <path d="m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z" />
      </SVGIcon>
    );
  }
);
