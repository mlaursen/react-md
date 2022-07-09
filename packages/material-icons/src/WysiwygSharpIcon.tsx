import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WysiwygSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M17 12H7v-2h10v2zm-4 2H7v2h6v-2zm8 7H3V3h18v18zM19 7H5v12h14V7z" />
      </SVGIcon>
    );
  }
);
