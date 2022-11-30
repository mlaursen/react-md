import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function LivingSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M15.5 12v2.5h-7V12h-2v4.5h11V12z" />
      <path d="M10 10v3h4v-3l2.25-.01V7.5h-8.5v2.49z" />
      <path d="M22 2H2v20h20V2zm-3 7.99V18H5v-8l1.25-.01V6h11.5v3.99H19z" />
    </SVGIcon>
  );
});
