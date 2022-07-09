import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FiberManualRecordIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M24 24H0V0h24v24z" fill="none" />
        <circle cx="12" cy="12" r="8" />
      </SVGIcon>
    );
  }
);
