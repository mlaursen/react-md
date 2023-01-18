import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ExpandLessOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
      </SVGIcon>
    );
  }
);
