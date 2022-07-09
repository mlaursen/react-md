import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DesktopWindowsSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M23 2H1v16h9v2H8v2h8v-2h-2v-2h9V2zm-2 14H3V4h18v12z" />
      </SVGIcon>
    );
  }
);
