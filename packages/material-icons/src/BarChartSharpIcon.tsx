import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BarChartSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z" />
      </SVGIcon>
    );
  }
);
