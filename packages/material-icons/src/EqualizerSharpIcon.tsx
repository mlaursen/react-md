import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EqualizerSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z" />
      </SVGIcon>
    );
  }
);
