import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ParkSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21z" />
    </SVGIcon>
  );
});
