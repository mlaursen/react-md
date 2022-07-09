import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ReadMoreIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M13 7h9v2h-9zm0 8h9v2h-9zm3-4h6v2h-6zm-3 1L8 7v4H2v2h6v4z" />
    </SVGIcon>
  );
});
