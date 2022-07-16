import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ArrowLeftIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="m14 7-5 5 5 5V7z" />
      <path d="M24 0v24H0V0h24z" fill="none" />
    </SVGIcon>
  );
});