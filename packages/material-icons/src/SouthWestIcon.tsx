import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function SouthWestIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M15 19v-2H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z" />
    </SVGIcon>
  );
});
