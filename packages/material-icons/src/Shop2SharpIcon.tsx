import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Shop2SharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M3 9H1v13h18v-2H3z" />
      <path d="M18 5V1h-8v4H5v13h18V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3.5L12 15z" />
    </SVGIcon>
  );
});
