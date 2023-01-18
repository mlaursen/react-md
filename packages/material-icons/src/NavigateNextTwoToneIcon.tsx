import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NavigateNextTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m10.02 18 6-6-6-6-1.41 1.41L13.19 12l-4.58 4.59z" />
      </SVGIcon>
    );
  }
);
