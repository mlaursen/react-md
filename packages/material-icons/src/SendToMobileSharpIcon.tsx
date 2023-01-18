import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SendToMobileSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 18H7V6h10v1h2V1H5v22h14v-6h-2z" />
        <path d="m22 12-4-4v3h-5v2h5v3z" />
      </SVGIcon>
    );
  }
);
