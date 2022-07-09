import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NorthEastOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" />
      </SVGIcon>
    );
  }
);
