import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SystemSecurityUpdateWarningIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11 15h2v2h-2zm0-8h2v6h-2z" />
        <path d="M17 1H7c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 17H7V6h10v12z" />
      </SVGIcon>
    );
  }
);