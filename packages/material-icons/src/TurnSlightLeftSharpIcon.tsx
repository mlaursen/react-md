import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TurnSlightLeftSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11.66 6V4H6v5.66h2V7.41l5 5V20h2v-8.41L9.41 6z" />
      </SVGIcon>
    );
  }
);
