import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PictureInPictureAltSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 11h-8v6h8v-6zm4 10V3H1v18h22zm-2-1.98H3V4.97h18v14.05z" />
      </SVGIcon>
    );
  }
);
