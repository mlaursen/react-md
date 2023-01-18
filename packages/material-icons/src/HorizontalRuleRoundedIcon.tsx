import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HorizontalRuleRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          fillRule="evenodd"
          d="M19 13H5c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1 .45 1 1s-.45 1-1 1z"
        />
      </SVGIcon>
    );
  }
);
