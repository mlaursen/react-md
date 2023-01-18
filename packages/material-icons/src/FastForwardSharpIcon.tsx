import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FastForwardSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m4 18 8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
      </SVGIcon>
    );
  }
);
