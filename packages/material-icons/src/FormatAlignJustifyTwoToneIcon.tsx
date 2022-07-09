import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatAlignJustifyTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 3h18v2H3zm0 8h18v2H3zm0 8h18v2H3zm0-4h18v2H3zm0-8h18v2H3z" />
      </SVGIcon>
    );
  }
);
