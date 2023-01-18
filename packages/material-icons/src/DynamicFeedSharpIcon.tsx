import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DynamicFeedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M8 8H6v9h11v-2H8z" />
        <path d="M22 3H10v10h12V3zm-2 8h-8V7h8v4zM4 12H2v9h11v-2H4z" />
      </SVGIcon>
    );
  }
);
