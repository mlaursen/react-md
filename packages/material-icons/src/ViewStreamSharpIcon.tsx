import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewStreamSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z" />
      </SVGIcon>
    );
  }
);
