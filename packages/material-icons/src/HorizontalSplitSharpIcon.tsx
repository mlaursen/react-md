import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HorizontalSplitSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 19h18v-6H3v6zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
      </SVGIcon>
    );
  }
);
