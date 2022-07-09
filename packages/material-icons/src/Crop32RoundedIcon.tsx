import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Crop32RoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H6c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z" />
      </SVGIcon>
    );
  }
);
