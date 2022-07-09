import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DoubleArrowTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M15.5 5H11l5 7-5 7h4.5l5-7z" />
        <path d="M8.5 5H4l5 7-5 7h4.5l5-7z" />
      </SVGIcon>
    );
  }
);
