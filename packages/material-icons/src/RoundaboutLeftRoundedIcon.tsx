import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function RoundaboutLeftRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 21c-.55 0-1-.45-1-1v-5.09c0-.98.71-1.8 1.67-1.97a3.999 3.999 0 1 0-4.61-4.61c-.17.96-.99 1.67-1.97 1.67H5.83l.88.88a.996.996 0 1 1-1.41 1.41L2.71 9.71a.996.996 0 0 1 0-1.41L5.3 5.71a.996.996 0 1 1 1.41 1.41L5.83 8h4.25A6 6 0 0 1 16 3c3.31 0 6 2.69 6 6 0 2.97-2.16 5.44-5 5.92V20c0 .55-.45 1-1 1z" />
      </SVGIcon>
    );
  }
);
