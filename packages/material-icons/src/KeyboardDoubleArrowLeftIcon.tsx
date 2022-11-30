import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardDoubleArrowLeftIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z" />
        <path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" />
      </SVGIcon>
    );
  }
);
