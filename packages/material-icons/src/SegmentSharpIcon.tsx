import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SegmentSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9 18h12v-2H9v2zM3 6v2h18V6H3zm6 7h12v-2H9v2z" />
      </SVGIcon>
    );
  }
);
