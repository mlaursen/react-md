import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AlignHorizontalRightSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 2h2v20h-2V2zM2 10h16V7H2v3zm6 7h10v-3H8v3z" />
      </SVGIcon>
    );
  }
);
