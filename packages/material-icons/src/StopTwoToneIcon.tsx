import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function StopTwoToneIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M8 8h8v8H8z" opacity=".3" />
      <path d="M6 18h12V6H6v12zM8 8h8v8H8V8z" />
    </SVGIcon>
  );
});
