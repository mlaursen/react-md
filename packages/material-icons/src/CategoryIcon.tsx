import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function CategoryIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="m12 2-5.5 9h11z" />
      <circle cx="17.5" cy="17.5" r="4.5" />
      <path d="M3 13.5h8v8H3z" />
    </SVGIcon>
  );
});