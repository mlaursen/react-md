import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NorthEastTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" />
      </SVGIcon>
    );
  }
);
