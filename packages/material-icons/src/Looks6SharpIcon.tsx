import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Looks6SharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M11 15h2v-2h-2v2zM21 3H3v18h18V3zm-6 6h-4v2h4v6H9V7h6v2z" />
    </SVGIcon>
  );
});
