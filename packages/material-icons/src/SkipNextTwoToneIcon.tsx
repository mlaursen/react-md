import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SkipNextTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M8 9.86v4.28L11.03 12z" opacity=".3" />
        <path d="M14.5 12 6 6v12l8.5-6zM8 9.86 11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
      </SVGIcon>
    );
  }
);
