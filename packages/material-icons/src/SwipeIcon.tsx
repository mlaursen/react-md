import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function SwipeIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M19.75 16.25c0 .06-.01.13-.02.2l-.75 5.27c-.11.73-.69 1.28-1.44 1.28h-6.79c-.41 0-.79-.17-1.06-.44l-4.94-4.94.79-.8c.2-.2.48-.33.79-.33.09 0 .16.02.24.03l3.43.72V6.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v6h.76c.19 0 .37.04.54.11l4.54 2.26c.53.22.91.76.91 1.38zm.38-12.38C18.69 2.17 15.6 1 12 1S5.31 2.17 3.87 3.87L2 2v5h5L4.93 4.93c1-1.29 3.7-2.43 7.07-2.43s6.07 1.14 7.07 2.43L17 7h5V2l-1.87 1.87z" />
    </SVGIcon>
  );
});