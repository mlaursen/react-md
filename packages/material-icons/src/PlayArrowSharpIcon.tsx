import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlayArrowSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M8 5v14l11-7L8 5z" />
      </SVGIcon>
    );
  }
);
