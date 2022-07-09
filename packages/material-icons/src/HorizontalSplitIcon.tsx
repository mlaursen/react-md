import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HorizontalSplitIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 19h18v-6H3v6zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
      </SVGIcon>
    );
  }
);
