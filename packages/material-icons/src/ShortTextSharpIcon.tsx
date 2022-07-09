import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ShortTextSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 9h16v2H4V9zm0 4h10v2H4v-2z" />
      </SVGIcon>
    );
  }
);
