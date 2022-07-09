import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TransitEnterexitTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15.98 6 9 12.77V8H6v10h10v-3h-4.85L18 8.03z" />
      </SVGIcon>
    );
  }
);
