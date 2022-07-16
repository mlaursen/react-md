import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SkipNextSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z" />
      </SVGIcon>
    );
  }
);