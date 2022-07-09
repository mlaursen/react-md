import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SettingsOverscanRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11.62 5.99 10 8h4l-1.6-2.01a.5.5 0 0 0-.78 0zM18 10v4l2.01-1.6a.5.5 0 0 0 0-.78L18 10zM6 10l-2.01 1.62a.5.5 0 0 0 0 .78L6 14v-4zm8 6h-4l1.62 2.01c.2.25.58.25.78 0L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16.01H4c-.55 0-1-.45-1-1V5.99c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12.02c0 .55-.45 1-1 1z" />
      </SVGIcon>
    );
  }
);
