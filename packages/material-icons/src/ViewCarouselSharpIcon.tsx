import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewCarouselSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 7h4v10H2V7zm5 12h10V5H7v14zM18 7h4v10h-4V7z" />
      </SVGIcon>
    );
  }
);
