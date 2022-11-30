import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewArraySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 5h-3v14h3V5zm-4 0H7v14h10V5zM6 5H3v14h3V5z" />
      </SVGIcon>
    );
  }
);
