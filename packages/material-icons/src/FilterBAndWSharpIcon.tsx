import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FilterBAndWSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 3H3v18h18V3zm-2 16-7-8v8H5l7-8V5h7v14z" />
      </SVGIcon>
    );
  }
);
