import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function DataArrayIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M15 4v2h3v12h-3v2h5V4zM4 20h5v-2H6V6h3V4H4z" />
    </SVGIcon>
  );
});
