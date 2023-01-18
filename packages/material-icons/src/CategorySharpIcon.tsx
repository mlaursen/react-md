import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CategorySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m12 2-5.5 9h11z" />
        <circle cx="17.5" cy="17.5" r="4.5" />
        <path d="M3 13.5h8v8H3z" />
      </SVGIcon>
    );
  }
);
