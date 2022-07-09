import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ArrowRightIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="m10 17 5-5-5-5v10z" />
      <path d="M0 24V0h24v24H0z" fill="none" />
    </SVGIcon>
  );
});
