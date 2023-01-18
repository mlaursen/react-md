import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowDropUpSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m7 14 5-5 5 5H7z" />
      </SVGIcon>
    );
  }
);
