import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CurtainsClosedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 19V3H4v16H2v2h20v-2h-2zM11 5h2v14h-2V5z" />
      </SVGIcon>
    );
  }
);
