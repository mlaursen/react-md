import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BorderTopTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 19h2v2h-2zM3 19h2v2H3zm8 0h2v2h-2zm-8-8h2v2H3zm0 4h2v2H3zm4 4h2v2H7zm4-12h2v2h-2zm0 4h2v2h-2zM3 7h2v2H3zm0-4h18v2H3zm8 12h2v2h-2zm4 4h2v2h-2zm-8-8h2v2H7zm8 0h2v2h-2zm4 4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z" />
      </SVGIcon>
    );
  }
);
