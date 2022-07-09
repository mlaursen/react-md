import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SingleBedTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path opacity=".3" d="M6 12h12v3H6z" />
        <path d="M18 10V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-5c0-1.1-.9-2-2-2zm-5-3h3v3h-3V7zM8 7h3v3H8V7zm10 8H6v-3h12v3z" />
      </SVGIcon>
    );
  }
);
