import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SlideshowSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10 8v8l5-4-5-4zm11-5H3v18h18V3zm-2 16H5V5h14v14z" />
      </SVGIcon>
    );
  }
);
