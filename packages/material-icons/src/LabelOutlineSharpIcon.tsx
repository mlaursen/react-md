import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LabelOutlineSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17.03 5H3v13.99l14.03.01L22 12l-4.97-7zM16 17H5V7h11l3.55 5L16 17z" />
      </SVGIcon>
    );
  }
);
