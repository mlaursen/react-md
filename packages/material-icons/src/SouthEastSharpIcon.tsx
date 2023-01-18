import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SouthEastSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 9h-2v6.59L5.41 4 4 5.41 15.59 17H9v2h10V9z" />
      </SVGIcon>
    );
  }
);
