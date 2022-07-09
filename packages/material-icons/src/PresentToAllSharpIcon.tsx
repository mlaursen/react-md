import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PresentToAllSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M23 3H1v18h22V3zm-2 16.02H3V4.98h18v14.04zM10 12H8l4-4 4 4h-2v4h-4v-4z" />
      </SVGIcon>
    );
  }
);
