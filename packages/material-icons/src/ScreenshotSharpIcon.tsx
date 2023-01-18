import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ScreenshotSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 1v22h14V1H5zm12 17H7V6h10v12zM9.5 8.5H12V7H8v4h1.5V8.5zM12 17h4v-4h-1.5v2.5H12V17z" />
      </SVGIcon>
    );
  }
);
