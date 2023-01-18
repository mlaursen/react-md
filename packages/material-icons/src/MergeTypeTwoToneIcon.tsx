import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MergeTypeTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8H11v5.59zm11.407 1.41-3.408-3.407 1.4-1.407 3.41 3.408z" />
      </SVGIcon>
    );
  }
);
