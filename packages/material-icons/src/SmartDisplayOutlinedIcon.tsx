import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SmartDisplayOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9.5 7.5v9l7-4.5z" />
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14.01H4V5.99h16v12.02z" />
      </SVGIcon>
    );
  }
);
