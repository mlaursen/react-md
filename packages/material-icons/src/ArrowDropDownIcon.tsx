import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowDropDownIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m7 10 5 5 5-5z" />
      </SVGIcon>
    );
  }
);
