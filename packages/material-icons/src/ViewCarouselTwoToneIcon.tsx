import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewCarouselTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 6h4v11h-4zM7 19h10V4H7v15zM9 6h6v11H9V6zM2 6h4v11H2z" />
        <path d="M9 6h6v11H9z" opacity=".3" />
      </SVGIcon>
    );
  }
);
