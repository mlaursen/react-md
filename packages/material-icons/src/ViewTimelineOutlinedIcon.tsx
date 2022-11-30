import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewTimelineOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 15h6v2H6zm6-8h6v2h-6zm-3 4h6v2H9z" />
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
      </SVGIcon>
    );
  }
);