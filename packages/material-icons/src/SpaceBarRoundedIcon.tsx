import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SpaceBarRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 10v3H6v-3c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1z" />
      </SVGIcon>
    );
  }
);
