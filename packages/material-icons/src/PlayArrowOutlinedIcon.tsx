import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlayArrowOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10 8.64 15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
      </SVGIcon>
    );
  }
);
