import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SouthEastRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M18 9c-.56 0-1 .45-1 1v5.59L6.12 4.7a.996.996 0 1 0-1.41 1.41L15.59 17H10c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1z" />
      </SVGIcon>
    );
  }
);
