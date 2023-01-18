import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ThumbUpOffAltSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M14.17 1 7 8.18V21h12.31L23 12.4V8h-8.31l1.12-5.38L14.17 1zM1 9h4v12H1V9z" />
      </SVGIcon>
    );
  }
);
