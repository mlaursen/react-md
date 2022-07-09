import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewDaySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 21h19v-3H2v3zM21 8H2v8h19V8zM2 3v3h19V3H2z" />
      </SVGIcon>
    );
  }
);
