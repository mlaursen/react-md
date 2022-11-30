import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Battery4BarSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4v18H7V4h3V2h4v2h3zm-2 2H9v6h6V6z" />
      </SVGIcon>
    );
  }
);
