import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VerticalAlignTopOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z" />
      </SVGIcon>
    );
  }
);
