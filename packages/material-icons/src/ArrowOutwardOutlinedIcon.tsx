import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowOutwardOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
      </SVGIcon>
    );
  }
);
