import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CloudySnowingIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 18c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm12 0c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm-9 4c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm3-4c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm3 4c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm3.5-6h-10A5.51 5.51 0 0 1 2 10.5c0-2.76 2.09-5.09 4.78-5.44A5.975 5.975 0 0 1 12 2c2.97 0 5.45 2.18 5.92 5.02A4.5 4.5 0 0 1 22 11.5c0 2.48-2.02 4.5-4.5 4.5z" />
      </SVGIcon>
    );
  }
);
