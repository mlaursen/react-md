import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FlashOnSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 2v11h3v9l7-12h-4l3-8z" />
      </SVGIcon>
    );
  }
);
