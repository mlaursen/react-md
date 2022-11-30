import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function GirlRoundedIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M12 7.5c.97 0 1.75-.78 1.75-1.75S12.97 4 12 4s-1.75.78-1.75 1.75S11.03 7.5 12 7.5zm2 8.5v3c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-3h-.56c-.7 0-1.18-.7-.94-1.35l1.88-5.03a1.733 1.733 0 0 1 3.24 0l1.88 5.03c.24.65-.24 1.35-.94 1.35H14z" />
    </SVGIcon>
  );
});
