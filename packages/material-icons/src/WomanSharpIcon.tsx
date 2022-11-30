import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function WomanSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M13.41 7h-2.82L7 16h3v6h4v-6h3z" />
      <circle cx="12" cy="4" r="2" />
    </SVGIcon>
  );
});