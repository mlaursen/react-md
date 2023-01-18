import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardControlKeyIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m5 12 1.41 1.41L12 7.83l5.59 5.58L19 12l-7-7z" />
      </SVGIcon>
    );
  }
);
