import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PriorityHighTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <circle cx="12" cy="19" r="2" />
        <path d="M10 3h4v12h-4z" />
      </SVGIcon>
    );
  }
);
