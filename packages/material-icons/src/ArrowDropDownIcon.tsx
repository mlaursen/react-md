import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowDropDownIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m7 10 5 5 5-5z" />
      </SVGIcon>
    );
  }
);
