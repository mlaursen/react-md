import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ManRoundedIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M14 7h-4c-1.1 0-2 .9-2 2v5c0 .55.45 1 1 1h1v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6h1c.55 0 1-.45 1-1V9c0-1.1-.9-2-2-2z" />
      <circle cx="12" cy="4" r="2" />
    </SVGIcon>
  );
});
