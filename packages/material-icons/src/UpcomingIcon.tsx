import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function UpcomingIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="m21.16 7.26-1.41-1.41-3.56 3.55 1.41 1.41s3.45-3.52 3.56-3.55zM11 3h2v5h-2zm-4.6 7.81L7.81 9.4 4.26 5.84 2.84 7.26c.11.03 3.56 3.55 3.56 3.55zM20 12h-5c0 1.66-1.34 3-3 3s-3-1.34-3-3H4c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2z" />
    </SVGIcon>
  );
});