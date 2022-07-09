import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LooksOneSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 3H3v18h18V3zm-7 14h-2V9h-2V7h4v10z" />
      </SVGIcon>
    );
  }
);
