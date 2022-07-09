import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function DraftsSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M21.99 6.86 12 1 2 6.86V20h20l-.01-13.14zM12 13 3.74 7.84 12 3l8.26 4.84L12 13z" />
    </SVGIcon>
  );
});
