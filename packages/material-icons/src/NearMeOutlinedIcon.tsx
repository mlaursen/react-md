import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NearMeOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m17.27 6.73-4.24 10.13-1.32-3.42-.32-.83-.82-.32-3.43-1.33 10.13-4.23M21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
      </SVGIcon>
    );
  }
);
