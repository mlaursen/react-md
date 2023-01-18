import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Battery5BarSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4v18H7V4h3V2h4v2h3zm-2 2H9v4h6V6z" />
      </SVGIcon>
    );
  }
);
