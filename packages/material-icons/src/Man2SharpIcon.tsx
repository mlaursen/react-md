import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Man2SharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M16 7H8v8h2.5v7h3v-7H16z" />
      <circle cx="12" cy="4" r="2" />
    </SVGIcon>
  );
});