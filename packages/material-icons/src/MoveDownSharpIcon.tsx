import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MoveDownSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 11c0 2.45 1.76 4.47 4.08 4.91l-1.49-1.49L7 13l4 4.01L7 21l-1.41-1.41 1.58-1.58v-.06A7.007 7.007 0 0 1 1 11c0-3.87 3.13-7 7-7h3v2H8c-2.76 0-5 2.24-5 5zm19 0V4h-9v7h9zm-2-2h-5V6h5v3zm-7 4h9v7h-9z" />
      </SVGIcon>
    );
  }
);
