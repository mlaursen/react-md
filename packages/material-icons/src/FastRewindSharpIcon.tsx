import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FastRewindSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6 8.5 6V6l-8.5 6z" />
      </SVGIcon>
    );
  }
);
