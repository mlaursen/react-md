import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TurnedInNotSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 3H5.01L5 21l7-3 7 3V3zm-2 15-5-2.18L7 18V5h10v13z" />
      </SVGIcon>
    );
  }
);
