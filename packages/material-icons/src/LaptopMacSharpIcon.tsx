import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LaptopMacSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m20 18 1.99-2L22 3H2v13l2 2H0v2h24v-2h-4zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </SVGIcon>
    );
  }
);
