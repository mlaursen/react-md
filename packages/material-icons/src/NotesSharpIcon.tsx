import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function NotesSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M21 11.01 3 11v2h18zM3 16h12v2H3zM21 6H3v2.01L21 8z" />
    </SVGIcon>
  );
});
