import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DoorFrontSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 19V3H5v16H3v2h18v-2h-2zm-4-6h-2v-2h2v2z" />
      </SVGIcon>
    );
  }
);
