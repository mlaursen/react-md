import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewCarouselOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 6h4v11H2zm5 13h10V4H7v15zM9 6h6v11H9V6zm9 0h4v11h-4z" />
      </SVGIcon>
    );
  }
);
