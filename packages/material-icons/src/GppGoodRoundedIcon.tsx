import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function GppGoodRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m11.3 2.26-6 2.25C4.52 4.81 4 5.55 4 6.39v4.71c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V6.39a2 2 0 0 0-1.3-1.87l-6-2.25c-.45-.18-.95-.18-1.4-.01zm-1.07 12.57-2.12-2.12a.996.996 0 1 1 1.41-1.41l1.41 1.41 3.54-3.54a.996.996 0 1 1 1.41 1.41l-4.24 4.24c-.38.4-1.02.4-1.41.01z" />
      </SVGIcon>
    );
  }
);
