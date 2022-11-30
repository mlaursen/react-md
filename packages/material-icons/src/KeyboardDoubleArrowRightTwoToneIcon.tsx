import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardDoubleArrowRightTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z" />
        <path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z" />
      </SVGIcon>
    );
  }
);
