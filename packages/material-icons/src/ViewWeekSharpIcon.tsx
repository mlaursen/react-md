import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewWeekSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 5H2v14h5V5zm14 0h-5v14h5V5zm-7 0H9v14h5V5z" />
      </SVGIcon>
    );
  }
);
