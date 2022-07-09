import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function PagesSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M3 3v8h5L7 7l4 1V3H3zm5 10H3v8h8v-5l-4 1 1-4zm9 4-4-1v5h8v-8h-5l1 4zm4-14h-8v5l4-1-1 4h5V3z" />
    </SVGIcon>
  );
});
