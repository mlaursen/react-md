import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NearMeDisabledRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m12 6.34 6.95-2.58c.8-.3 1.58.48 1.29 1.29L17.66 12 12 6.34zm9.9 12.73L4.93 2.1a.996.996 0 1 0-1.41 1.41l4.36 4.36-4.2 1.56c-.41.16-.68.54-.68.97 0 .42.26.8.65.96l6.42 2.57 2.57 6.42c.16.39.54.65.96.65.43 0 .82-.27.97-.67l1.56-4.2 4.36 4.36c.39.39 1.02.39 1.41 0 .39-.4.39-1.03 0-1.42z" />
      </SVGIcon>
    );
  }
);
