import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WifiProtectedSetupRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m16.7 5.3 1.44-1.44c.32-.32.09-.85-.35-.85H11.5c-.28 0-.5.22-.5.5V9.8c0 .45.54.67.85.35L13.3 8.7c1.97 1.46 3.25 3.78 3.25 6.42 0 .66-.08 1.31-.24 1.92-.12.5.48.86.84.49a8.474 8.474 0 0 0 2.4-5.91c0-2.51-1.11-4.76-2.85-6.32zm-4.55 8.56L10.7 15.3c-1.97-1.46-3.25-3.78-3.25-6.42 0-.66.08-1.31.24-1.92.12-.5-.48-.86-.84-.49a8.474 8.474 0 0 0 .44 12.24l-1.44 1.44c-.32.32-.09.85.35.85h6.29c.28 0 .5-.22.5-.5v-6.29a.49.49 0 0 0-.84-.35z" />
      </SVGIcon>
    );
  }
);
