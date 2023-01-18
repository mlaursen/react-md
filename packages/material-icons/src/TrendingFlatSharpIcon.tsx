import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TrendingFlatSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m22 12-4-4v3H3v2h15v3l4-4z" />
      </SVGIcon>
    );
  }
);
