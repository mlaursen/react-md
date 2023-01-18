import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PaymentSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 4H2v16h20V4zm-2 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </SVGIcon>
    );
  }
);
