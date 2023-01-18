import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LinearScaleRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 7c-2.41 0-4.43 1.72-4.9 4H6.79c-.39-.88-1.27-1.5-2.29-1.5a2.5 2.5 0 0 0 0 5c1.02 0 1.9-.62 2.29-1.5h5.31A5 5 0 1 0 17 7zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
      </SVGIcon>
    );
  }
);
