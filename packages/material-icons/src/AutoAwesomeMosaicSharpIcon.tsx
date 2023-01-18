import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AutoAwesomeMosaicSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 21h8V3H3v18zM21 3h-8v8h8V3zm-8 18h8v-8h-8v8z" />
      </SVGIcon>
    );
  }
);
