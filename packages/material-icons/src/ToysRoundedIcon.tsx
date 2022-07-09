import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function ToysRoundedIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M12 12c0-3 2.5-5.5 5.5-5.5 2.57 0 4.77 1.83 5.35 4.24.15.64-.32 1.26-.97 1.26H12zm0 0c0 3-2.5 5.5-5.5 5.5-2.57 0-4.77-1.83-5.35-4.24-.15-.64.32-1.26.97-1.26H12zm0 0c-3 0-5.5-2.5-5.5-5.5 0-2.57 1.83-4.77 4.24-5.35.64-.15 1.26.32 1.26.97V12zm0 0c3 0 5.5 2.5 5.5 5.5 0 2.57-1.83 4.77-4.24 5.35-.64.15-1.26-.32-1.26-.97V12z" />
    </SVGIcon>
  );
});
