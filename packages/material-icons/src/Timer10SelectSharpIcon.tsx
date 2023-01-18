import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Timer10SelectSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M13 8v8h-3V8h3m3-3H7v14h9V5zM1 8h2v11h3V5H1v3zm22 3h-6v5h4v1h-4v2h6v-5h-4v-1h4v-2z" />
      </SVGIcon>
    );
  }
);
