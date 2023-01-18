import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TableRowsSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z" />
      </SVGIcon>
    );
  }
);
