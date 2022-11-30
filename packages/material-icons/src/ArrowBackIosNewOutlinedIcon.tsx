import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowBackIosNewOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z" />
      </SVGIcon>
    );
  }
);
