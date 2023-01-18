import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function DockSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M8 23h8v-2H8v2zM18 1.01 6 1v18h12V1.01zM16 15H8V5h8v10z" />
    </SVGIcon>
  );
});
