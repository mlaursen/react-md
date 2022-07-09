import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ViewArrayIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z" />
    </SVGIcon>
  );
});
