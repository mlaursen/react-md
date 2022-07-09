import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BrandingWatermarkSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M23 3H1v18h22V3zm-2 16h-9v-6h9v6z" />
      </SVGIcon>
    );
  }
);
