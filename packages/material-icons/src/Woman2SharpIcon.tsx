import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Woman2SharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M13.41 7h-2.82L7 16h3.5v6h3v-6H17z" />
      <circle cx="12" cy="4" r="2" />
    </SVGIcon>
  );
});