import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AdUnitsSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M19 1H5v22h14V1zm-2 18H7V5h10v14z" />
        <path d="M8 6h8v2H8z" />
      </SVGIcon>
    );
  }
);
