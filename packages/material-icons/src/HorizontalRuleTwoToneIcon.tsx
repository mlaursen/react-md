import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HorizontalRuleTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fillRule="evenodd" d="M4 11h16v2H4z" />
      </SVGIcon>
    );
  }
);
