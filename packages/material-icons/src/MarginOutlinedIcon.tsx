import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MarginOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2V7zM7 7h2v2H7V7zm8 0h2v2h-2V7zm-8 4h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
      </SVGIcon>
    );
  }
);
