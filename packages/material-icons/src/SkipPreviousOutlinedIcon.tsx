import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SkipPreviousOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 6h2v12H6zm3.5 6 8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z" />
      </SVGIcon>
    );
  }
);
