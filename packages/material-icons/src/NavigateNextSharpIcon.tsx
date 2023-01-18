import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NavigateNextSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10.02 6 8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
      </SVGIcon>
    );
  }
);
