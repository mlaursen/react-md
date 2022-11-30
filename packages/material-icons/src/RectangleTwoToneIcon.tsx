import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function RectangleTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 6h16v12H4z" opacity=".3" />
        <path d="M2 4v16h20V4H2zm18 14H4V6h16v12z" />
      </SVGIcon>
    );
  }
);
