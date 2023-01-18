import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VerticalAlignBottomTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11 3v10H8l4 4 4-4h-3V3zM4 19h16v2H4z" />
      </SVGIcon>
    );
  }
);
