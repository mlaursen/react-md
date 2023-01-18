import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function RepartitionIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M3 21h18v-6H3v6zm7.33-2v-2h3.33v2h-3.33zM19 19h-3.33v-2H19v2zM5 17h3.33v2H5v-2zm1-7 1.42-1.42L5.83 7H17c1.1 0 2 .9 2 2s-.9 2-2 2H3v2h14c2.21 0 4-1.79 4-4s-1.79-4-4-4H5.83l1.59-1.59L6 2 2 6l4 4z" />
    </SVGIcon>
  );
});
