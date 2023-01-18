import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ChevronRightIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </SVGIcon>
    );
  }
);
