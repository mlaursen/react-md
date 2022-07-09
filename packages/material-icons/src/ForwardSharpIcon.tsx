import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ForwardSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 8V4l8 8-8 8v-4H4V8h8z" />
      </SVGIcon>
    );
  }
);
