import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewTimelineSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 3H3v18h18V3zm-9 14H6v-2h6v2zm3-4H9v-2h6v2zm3-4h-6V7h6v2z" />
      </SVGIcon>
    );
  }
);
