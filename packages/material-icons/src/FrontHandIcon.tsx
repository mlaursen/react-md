import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function FrontHandIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M19.75 8c-.69 0-1.25.56-1.25 1.25V15H18c-1.65 0-3 1.35-3 3h-1c0-2.04 1.53-3.72 3.5-3.97V3.25a1.25 1.25 0 0 0-2.5 0V11h-1V1.25a1.25 1.25 0 0 0-2.5 0V11h-1V2.75a1.25 1.25 0 0 0-2.5 0V12H7V5.75a1.25 1.25 0 0 0-2.5 0v10c0 4.56 3.69 8.25 8.25 8.25S21 20.31 21 15.75v-6.5C21 8.56 20.44 8 19.75 8z" />
    </SVGIcon>
  );
});
