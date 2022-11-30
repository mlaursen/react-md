import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function QuickreplySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 2H2v20l4-4h9v-8h7z" />
        <path d="M22.5 16h-2.2l1.7-4h-5v6h2v5z" />
      </SVGIcon>
    );
  }
);
