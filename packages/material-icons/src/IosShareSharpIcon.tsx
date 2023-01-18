import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function IosShareSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 8h-5v2h3v11H6V10h3V8H4v15h16z" />
        <path d="M11 16h2V5h3l-4-4-4 4h3z" />
      </SVGIcon>
    );
  }
);
