import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowLeftOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m14 7-5 5 5 5V7z" />
      </SVGIcon>
    );
  }
);
