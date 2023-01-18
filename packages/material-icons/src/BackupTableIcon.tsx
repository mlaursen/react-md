import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(function BackupTableIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M20 6v14H6v2h14c1.1 0 2-.9 2-2V6h-2z" />
      <path d="M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 16H4v-5h5v5zm7 0h-5v-5h5v5zm0-7H4V4h12v5z" />
    </SVGIcon>
  );
});
