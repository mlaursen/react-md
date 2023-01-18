import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SouthWestSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 19v-2H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z" />
      </SVGIcon>
    );
  }
);
