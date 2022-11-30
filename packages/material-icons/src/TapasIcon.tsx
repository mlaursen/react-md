import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function TapasIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M22 10V1h-8v9c0 1.86 1.28 3.41 3 3.86V21h-2v2h6v-2h-2v-7.14c1.72-.45 3-2 3-3.86zm-2-7v3h-4V3h4zm-7.5 8.5A2.5 2.5 0 0 1 10 14H8v9H6v-9H4a2.5 2.5 0 0 1 0-5h2V8H4a2.5 2.5 0 0 1 0-5h2V1h2v2h2a2.5 2.5 0 0 1 0 5H8v1h2a2.5 2.5 0 0 1 2.5 2.5z" />
    </SVGIcon>
  );
});
