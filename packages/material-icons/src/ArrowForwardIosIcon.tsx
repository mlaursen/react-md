import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowForwardIosIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z" />
      </SVGIcon>
    );
  }
);
