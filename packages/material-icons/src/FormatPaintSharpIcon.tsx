import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatPaintSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 4V2H4v6h14V6h1v4H9v12h4V12h8V4h-3z" />
      </SVGIcon>
    );
  }
);
