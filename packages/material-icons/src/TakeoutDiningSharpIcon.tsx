import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TakeoutDiningSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m22 7.46-1.41-1.41L19 7.63l.03-.56L14.98 3H9.02L4.97 7.07l.03.5-1.59-1.56L2 7.44 4.66 10h14.69zM5.93 20h12.14l.63-8.45H5.3z" />
      </SVGIcon>
    );
  }
);
