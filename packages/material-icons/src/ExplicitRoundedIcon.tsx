import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ExplicitRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 6h-3v2h3c.55 0 1 .45 1 1s-.45 1-1 1h-3v2h3c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1z" />
      </SVGIcon>
    );
  }
);