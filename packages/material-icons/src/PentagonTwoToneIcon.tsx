import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PentagonTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19.63 9.78 16.56 19H7.44L4.37 9.78 12 4.44z" opacity=".3" />
        <path d="M19.63 9.78 16.56 19H7.44L4.37 9.78 12 4.44l7.63 5.34zM2 9l4 12h12l4-12-10-7L2 9z" />
      </SVGIcon>
    );
  }
);
