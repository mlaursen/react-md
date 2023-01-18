import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LocalBarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9.23 9 12 12.11 14.77 9z" opacity=".3" />
        <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM5.66 5h12.69l-1.78 2H7.43L5.66 5zM12 12.11 9.23 9h5.54L12 12.11z" />
      </SVGIcon>
    );
  }
);
