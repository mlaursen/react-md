import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FunctionsTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 17h-7l5-5-5-5h7V4H6v2l6.5 6L6 18v2h12z" />
      </SVGIcon>
    );
  }
);