import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewComfySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 4v7h20V4H2zm8 16h12v-7H10v7zm-8 0h6v-7H2v7z" />
      </SVGIcon>
    );
  }
);
