import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AnalyticsSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path fill="none" d="M7 12h2v5H7zm4 2h2v3h-2zm4-7h2v10h-2z" />
        <path d="M3 3v18h18V3H3zm6 14H7v-5h2v5zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2zm4 5h-2V7h2v10z" />
      </SVGIcon>
    );
  }
);
