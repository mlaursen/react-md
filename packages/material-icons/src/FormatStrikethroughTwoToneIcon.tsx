import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatStrikethroughTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 12h18v2H3zm11-2V7h5V4H5v3h5v3zm-4 6h4v3h-4z" />
      </SVGIcon>
    );
  }
);
