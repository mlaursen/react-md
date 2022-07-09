import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AnalyticsTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path opacity=".3" d="M5 5h14v14H5z" />
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
        <path d="M7 12h2v5H7zm8-5h2v10h-2zm-4 7h2v3h-2zm0-4h2v2h-2z" />
      </SVGIcon>
    );
  }
);
