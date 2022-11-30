import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WidthFullSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 4H2v16h20V4zM4 6h1v12H4V6zm16 12h-1V6h1v12z" />
      </SVGIcon>
    );
  }
);
