import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WindPowerSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 3h6v2H4zM1 7h5v2H1zm2 12h5v2H3zm12.32-6.91 5.42-9.04L17.32 1 12 5.97v4.74a2.485 2.485 0 0 1 3.32 1.38zM10.5 13c0-.82.4-1.54 1.01-2H1v4l7 2 3.44-2.06A2.48 2.48 0 0 1 10.5 13zm9.67 10L23 20.17l-3.54-6.36-3.98-1c0 .06.02.12.02.19a2.5 2.5 0 0 1-2.5 2.5c-.36 0-.69-.08-1-.21V21c-1.1 0-2 .9-2 2h6c0-1.1-.9-2-2-2v-4.17L20.17 23z" />
        <circle cx="13" cy="13" r="1.5" />
      </SVGIcon>
    );
  }
);
