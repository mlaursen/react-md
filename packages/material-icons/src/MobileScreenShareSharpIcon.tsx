import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MobileScreenShareSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5.01 1v22H19V1H5.01zM17 19H7V5h10v14zm-4.2-5.76v1.75L16 12l-3.2-2.98v1.7c-3.11.43-4.35 2.56-4.8 4.7 1.11-1.5 2.58-2.18 4.8-2.18z" />
      </SVGIcon>
    );
  }
);