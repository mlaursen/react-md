import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KingBedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 10V5H4v5H2v7h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-7h-2zm-9 0H6V7h5v3zm7 0h-5V7h5v3z" />
      </SVGIcon>
    );
  }
);
