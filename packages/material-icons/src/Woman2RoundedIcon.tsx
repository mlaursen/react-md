import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Woman2RoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M13.94 8.31a2.078 2.078 0 0 0-2.48-1.24c-.66.17-1.18.7-1.43 1.34l-2.48 6.22c-.27.66.22 1.37.92 1.37h2.03v5c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-5h2.03c.71 0 1.19-.71.93-1.37l-2.52-6.32z" />
        <circle cx="12" cy="4" r="2" />
      </SVGIcon>
    );
  }
);
