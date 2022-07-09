import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowForwardIosIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M5.88 4.12 13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
      </SVGIcon>
    );
  }
);
