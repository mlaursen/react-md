import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellular1BarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 22h20V2L2 22z" fillOpacity=".3" />
        <path d="M12 12 2 22h10V12z" />
      </SVGIcon>
    );
  }
);
