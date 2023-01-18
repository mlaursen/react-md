import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ImagesearchRollerSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 2v6H6V6H4v4h10v5h2v8h-6v-8h2v-3H2V4h4V2h14z" />
      </SVGIcon>
    );
  }
);
