import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FiberManualRecordRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <circle cx="12" cy="12" r="8" />
      </SVGIcon>
    );
  }
);
