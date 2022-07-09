import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MinimizeSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 19h12v2H6v-2z" />
      </SVGIcon>
    );
  }
);
