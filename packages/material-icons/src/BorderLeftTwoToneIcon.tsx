import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BorderLeftTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11 3h2v2h-2zM3 3h2v18H3zm12 0h2v2h-2zm-4 16h2v2h-2zm0-4h2v2h-2zm4 4h2v2h-2zM11 7h2v2h-2zm0 4h2v2h-2zm8 4h2v2h-2zm0 4h2v2h-2zm0-12h2v2h-2zm0 4h2v2h-2zm0-8h2v2h-2zm-4 8h2v2h-2zm-8 8h2v2H7zm0-8h2v2H7zm0-8h2v2H7z" />
      </SVGIcon>
    );
  }
);
