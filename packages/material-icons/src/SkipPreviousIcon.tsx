import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SkipPreviousIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
      </SVGIcon>
    );
  }
);
