import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NorthWestTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 15h2V8.41L18.59 20 20 18.59 8.41 7H15V5H5v10z" />
      </SVGIcon>
    );
  }
);
