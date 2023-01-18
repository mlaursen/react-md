import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function BoltSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M11 21h-1l1-7H6.74S10.42 7.54 13 3h1l-1 7h4.28L11 21z" />
    </SVGIcon>
  );
});
