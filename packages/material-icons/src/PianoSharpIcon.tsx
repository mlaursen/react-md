import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function PianoSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M21 3H3v18h18V3zm-8 11.5h1.25V19h-4.5v-4.5H11V5h2v9.5zM5 5h2v9.5h1.25V19H5V5zm14 14h-3.25v-4.5H17V5h2v14z" />
    </SVGIcon>
  );
});
