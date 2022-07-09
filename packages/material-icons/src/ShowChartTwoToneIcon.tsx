import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ShowChartTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m13.5 13.48-4-4L2 16.99l1.5 1.5 6-6.01 4 4L22 6.92l-1.41-1.41z" />
      </SVGIcon>
    );
  }
);
