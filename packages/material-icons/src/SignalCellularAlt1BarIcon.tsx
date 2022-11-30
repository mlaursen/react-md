import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellularAlt1BarIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 14h3v6H5v-6z" />
      </SVGIcon>
    );
  }
);
