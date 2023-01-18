import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DomainVerificationSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m16.6 10.88-1.42-1.42-4.24 4.25-2.12-2.13L7.4 13l3.54 3.54z" />
        <path d="M3 4v16h18V4H3zm16 14H5V8h14v10z" />
      </SVGIcon>
    );
  }
);
