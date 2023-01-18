import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DeviceHubRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m17 16-4-4V8.82c1.35-.49 2.26-1.89 1.93-3.46a3.013 3.013 0 0 0-2.42-2.32A3.001 3.001 0 0 0 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H4c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-2.05l4-4.2 4 4.2V20c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3z" />
      </SVGIcon>
    );
  }
);
