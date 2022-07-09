import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function FestivalIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M13 5.7V4h3l-1-1.49L16 1h-5v4.7L2 12v10h7v-5l3.03-2L15 17v5h7V12z" />
    </SVGIcon>
  );
});
