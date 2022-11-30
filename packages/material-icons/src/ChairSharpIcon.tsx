import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ChairSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M7 13h10V7h3V3H4v4h3z" />
      <path d="M23 9h-4v6H5V9H1v10h3v1c0 .55.45 1 1 1s1-.45 1-1v-1h12v1c0 .55.45 1 1 1s1-.45 1-1v-1h3V9z" />
    </SVGIcon>
  );
});