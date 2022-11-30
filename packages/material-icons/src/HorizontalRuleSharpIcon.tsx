import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HorizontalRuleSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fillRule="evenodd" d="M4 11h16v2H4z" />
      </SVGIcon>
    );
  }
);
