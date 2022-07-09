import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TextRotationAngledownSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
        <path d="M15 21v-4.24l-1.41 1.41-9.2-9.19-1.41 1.41 9.19 9.19L10.76 21H15zM11.25 8.48l3.54 3.54-.92 2.19 1.48 1.48 4.42-11.14-1.06-1.05L7.57 7.92 9.06 9.4l2.19-.92zm6.59-3.05-2.23 4.87-2.64-2.64 4.87-2.23z" />
      </SVGIcon>
    );
  }
);
