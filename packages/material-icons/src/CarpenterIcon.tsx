import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function CarpenterIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M19.73 14.23 7 1.5 3.11 5.39l8.13 11.67c-.78.78-.78 2.05 0 2.83l1.41 1.41c.78.78 2.05.78 2.83 0l4.24-4.24c.79-.78.79-2.05.01-2.83zm-5.66 5.65-1.41-1.41 4.24-4.24 1.41 1.41-4.24 4.24z" />
    </SVGIcon>
  );
});
