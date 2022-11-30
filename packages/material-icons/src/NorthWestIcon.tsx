import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function NorthWestIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M5 15h2V8.41L18.59 20 20 18.59 8.41 7H15V5H5v10z" />
    </SVGIcon>
  );
});
