import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FeaturedPlayListSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M23 3H1v18h22V3zm-11 8H3V9h9v2zm0-4H3V5h9v2z" />
      </SVGIcon>
    );
  }
);
