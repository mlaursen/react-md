import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SingleBedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M18 10V5H6v5H4v7h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-7h-2zm-7 0H8V7h3v3zm5 0h-3V7h3v3z" />
      </SVGIcon>
    );
  }
);
