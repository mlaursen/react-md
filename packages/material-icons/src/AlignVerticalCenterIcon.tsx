import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AlignVerticalCenterIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 11h-5V6h-3v5h-4V3H7v8H1.84v2H7v8h3v-8h4v5h3v-5h5z" />
      </SVGIcon>
    );
  }
);
