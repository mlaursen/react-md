import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Man4SharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M7.96 7 10 22h4l2.04-15z" />
      <circle cx="12" cy="4" r="2" />
    </SVGIcon>
  );
});
