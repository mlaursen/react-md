import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TurnSlightRightSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12.34 6V4H18v5.66h-2V7.41l-5 5V20H9v-8.41L14.59 6z" />
      </SVGIcon>
    );
  }
);
