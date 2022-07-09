import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function MailSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <path d="M22 4H2v16h20V4zm-2 4-8 5-8-5V6l8 5 8-5v2z" />
    </SVGIcon>
  );
});
