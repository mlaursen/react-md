import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TabUnselectedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm8 8h2v-2H9v2zm-8-4h2v-2H1v2zm0 4h2v-2H1v2zM23 3H13v6h10V3zm-2 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zM1 5h2V3H1v2zm20 8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z" />
      </SVGIcon>
    );
  }
);
