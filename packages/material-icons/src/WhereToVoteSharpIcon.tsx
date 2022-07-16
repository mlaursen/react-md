import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WhereToVoteSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1.53 12-3.48-3.48L8.4 9.1l2.07 2.07 5.13-5.14 1.41 1.42L10.47 14z" />
      </SVGIcon>
    );
  }
);