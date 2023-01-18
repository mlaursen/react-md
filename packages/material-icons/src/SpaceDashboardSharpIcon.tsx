import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SpaceDashboardSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11 21H3V3h8v18zm2 0h8v-9h-8v9zm8-11V3h-8v7h8z" />
      </SVGIcon>
    );
  }
);
