import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FilterAltSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 4c2.01 2.59 7 9 7 9v7h4v-7s4.98-6.41 7-9H3z" />
      </SVGIcon>
    );
  }
);
