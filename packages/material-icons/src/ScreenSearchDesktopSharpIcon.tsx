import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ScreenSearchDesktopSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M1 19h22v2H1zM22 3H2v15h19.99L22 3zm-6.53 12.03-2.09-2.09c-1.35.87-3.17.71-4.36-.47-1.37-1.37-1.37-3.58 0-4.95s3.58-1.37 4.95 0c1.18 1.18 1.34 3 .47 4.36l2.09 2.09-1.06 1.06z" />
        <circle cx="11.5" cy="10" r="2" />
      </SVGIcon>
    );
  }
);
