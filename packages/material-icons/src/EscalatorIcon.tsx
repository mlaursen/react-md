import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function EscalatorIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 6h-1.7l-5 9H7c-.83 0-1.5-.67-1.5-1.5S6.17 15 7 15h1.7l5-9H17c.83 0 1.5.67 1.5 1.5S17.83 9 17 9z" />
    </SVGIcon>
  );
});
