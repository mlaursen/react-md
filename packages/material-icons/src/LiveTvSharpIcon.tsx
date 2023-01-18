import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function LiveTvSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M23 6h-9.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H1v16h22V6zm-2 14H3V8h18v12zM9 10v8l7-4-7-4z" />
    </SVGIcon>
  );
});
