import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VerticalAlignBottomSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z" />
      </SVGIcon>
    );
  }
);
