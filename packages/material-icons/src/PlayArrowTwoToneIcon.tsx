import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlayArrowTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10 8.64v6.72L15.27 12z" opacity=".3" />
        <path d="m8 19 11-7L8 5v14zm2-10.36L15.27 12 10 15.36V8.64z" />
      </SVGIcon>
    );
  }
);
