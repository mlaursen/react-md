import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function BubbleChartIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M0 0h24v24H0z" fill="none" />
      <circle cx="7.2" cy="14.4" r="3.2" />
      <circle cx="14.8" cy="18" r="2" />
      <circle cx="15.2" cy="8.8" r="4.8" />
    </SVGIcon>
  );
});
