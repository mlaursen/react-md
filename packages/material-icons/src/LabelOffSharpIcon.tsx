import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LabelOffSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m22 12-4.97-7H8.66l10.7 10.73zM2 4l1 1v14h14l2 2 1.41-1.41L3.44 2.62z" />
      </SVGIcon>
    );
  }
);
