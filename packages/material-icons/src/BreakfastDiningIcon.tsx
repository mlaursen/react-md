import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BreakfastDiningIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          fillRule="evenodd"
          d="M18 3H6C3.79 3 2 4.79 2 7c0 1.48.81 2.75 2 3.45V19c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.55c1.19-.69 2-1.97 2-3.45 0-2.21-1.79-4-4-4zm-4 12h-4v-4h4v4z"
        />
      </SVGIcon>
    );
  }
);
