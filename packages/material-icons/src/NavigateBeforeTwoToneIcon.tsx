import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NavigateBeforeTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m14.2 6-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
      </SVGIcon>
    );
  }
);
