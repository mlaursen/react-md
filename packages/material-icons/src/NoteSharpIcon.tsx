import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function NoteSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="m22 10-6-6H2v16h20V10zm-7-4.5 5.5 5.5H15V5.5z" />
    </SVGIcon>
  );
});
