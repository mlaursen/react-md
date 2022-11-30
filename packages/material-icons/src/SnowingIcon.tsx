import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function SnowingIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M6 12.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM4.75 6a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm12 8a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm0-8a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm-9 12a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm0-8a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm3 4a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm0-8a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm3 12a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0zm0-8a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0z" />
    </SVGIcon>
  );
});
