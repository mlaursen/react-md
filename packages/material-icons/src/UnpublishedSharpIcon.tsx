import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function UnpublishedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21.19 21.19 2.81 2.81 1.39 4.22l2.27 2.27A9.91 9.91 0 0 0 2 12c0 5.52 4.48 10 10 10 2.04 0 3.93-.61 5.51-1.66l2.27 2.27 1.41-1.42zm-10.6-4.59-4.24-4.24 1.41-1.41 2.83 2.83.18-.18 1.41 1.41-1.59 1.59zm3-5.84-7.1-7.1A9.91 9.91 0 0 1 12 2c5.52 0 10 4.48 10 10 0 2.04-.61 3.93-1.66 5.51L15 12.17l2.65-2.65-1.41-1.41-2.65 2.65z" />
      </SVGIcon>
    );
  }
);
