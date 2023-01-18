import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PhoneAndroidSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 1H5v22h14V1zm-5 20h-4v-1h4v1zm3-3H7V4h10v14z" />
      </SVGIcon>
    );
  }
);
