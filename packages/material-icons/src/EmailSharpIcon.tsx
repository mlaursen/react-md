import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function EmailSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M22 4H2v16h20V4zm-2 4-8 5-8-5V6l8 5 8-5v2z" />
    </SVGIcon>
  );
});
