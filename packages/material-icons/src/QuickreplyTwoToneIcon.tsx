import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function QuickreplyTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 4v13.17L5.17 16H15v-6h5V4z" opacity=".3" />
        <path d="M5.17 16 4 17.17V4h16v6h2V4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9v-2H5.17z" />
        <path d="m19 23 3.5-7h-2.2l1.7-4h-5v6h2z" />
      </SVGIcon>
    );
  }
);
