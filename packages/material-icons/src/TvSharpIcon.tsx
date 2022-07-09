import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function TvSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M23 3H1v16h7v2h8v-2h6.99L23 3zm-2 14H3V5h18v12z" />
    </SVGIcon>
  );
});
