import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WidthFullSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 4H2v16h20V4zM4 6h1v12H4V6zm16 12h-1V6h1v12z" />
      </SVGIcon>
    );
  }
);
