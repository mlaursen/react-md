import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BatterySaverSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4h-3V2h-4v2H7v18h10V4zm-2 10h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z" />
      </SVGIcon>
    );
  }
);
