import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DataThresholdingOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-1.73L19 17.27V19zm0-3h-.85l-3 3h-1.62l3-3h-2.12l-3 3H9.8l3-3h-2.12l-3 3H5.84l3-3H6.72L5 17.72V5h14v11z" />
        <path d="m10.67 11 2 2 5.08-5.09-1.41-1.41-3.67 3.67-2-2-4.42 4.42L7.66 14z" />
      </SVGIcon>
    );
  }
);
