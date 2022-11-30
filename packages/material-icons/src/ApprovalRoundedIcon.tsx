import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ApprovalRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 16v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2zm13 2H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zM12 2C9.54 2 7.48 3.79 7.07 6.13c-.08.52.06 1.05.36 1.47l3.76 5.26a1 1 0 0 0 1.63 0l3.76-5.26c.3-.42.44-.95.35-1.47A5.016 5.016 0 0 0 12 2z" />
      </SVGIcon>
    );
  }
);
