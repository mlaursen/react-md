import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ZoomInMapIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M9 9V3H7v2.59L3.91 2.5 2.5 3.91 5.59 7H3v2h6zm12 0V7h-2.59l3.09-3.09-1.41-1.41L17 5.59V3h-2v6h6zM3 15v2h2.59L2.5 20.09l1.41 1.41L7 18.41V21h2v-6H3zm12 0v6h2v-2.59l3.09 3.09 1.41-1.41L18.41 17H21v-2h-6z" />
    </SVGIcon>
  );
});
