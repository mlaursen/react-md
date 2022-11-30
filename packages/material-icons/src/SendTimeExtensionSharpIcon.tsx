import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SendTimeExtensionSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 4h-6a2.5 2.5 0 0 0-5 0H3.01v5.8C5.7 9.8 6 11.96 6 12.5s-.29 2.7-3 2.7V21h5.8c0-2.16 1.37-2.78 2.2-2.94v-9.3l9 4.5V4z" />
        <path d="M13 12v4l4 1-4 1v4l10-5z" />
      </SVGIcon>
    );
  }
);