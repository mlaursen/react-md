import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SignalCellularAlt1BarSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 14h3v6H5v-6z" />
      </SVGIcon>
    );
  }
);
