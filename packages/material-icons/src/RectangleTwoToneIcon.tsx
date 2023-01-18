import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

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
