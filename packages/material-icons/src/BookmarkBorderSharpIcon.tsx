import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BookmarkBorderSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 3H5v18l7-3 7 3V3zm-2 15-5-2.18L7 18V5h10v13z" />
      </SVGIcon>
    );
  }
);
