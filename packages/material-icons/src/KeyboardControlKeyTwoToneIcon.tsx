import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardControlKeyTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m5 12 1.41 1.41L12 7.83l5.59 5.58L19 12l-7-7z" />
      </SVGIcon>
    );
  }
);
