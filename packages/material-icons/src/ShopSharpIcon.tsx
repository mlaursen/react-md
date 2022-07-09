import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ShopSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M16 6V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H2v15h20V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z" />
    </SVGIcon>
  );
});
