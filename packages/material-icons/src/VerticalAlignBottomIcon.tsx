import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VerticalAlignBottomIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z" />
      </SVGIcon>
    );
  }
);
