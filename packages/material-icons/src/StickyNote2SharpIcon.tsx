import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function StickyNote2SharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2.99 3 3 21h12l6-6V3H2.99zM7 8h10v2H7V8zm5 6H7v-2h5v2zm2 5.5V14h5.5L14 19.5z" />
      </SVGIcon>
    );
  }
);
