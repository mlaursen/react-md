import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function Face6SharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8h2.62l2-4h6.76l2 4H20c0 4.41-3.59 8-8 8z" />
      <circle cx="9" cy="13" r="1.25" />
      <circle cx="15" cy="13" r="1.25" />
    </SVGIcon>
  );
});
