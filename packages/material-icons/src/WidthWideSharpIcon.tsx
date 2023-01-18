import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WidthWideSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 4H2v16h20V4zM4 6h2v12H4V6zm16 12h-2V6h2v12z" />
      </SVGIcon>
    );
  }
);
