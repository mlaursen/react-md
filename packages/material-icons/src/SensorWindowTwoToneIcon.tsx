import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SensorWindowTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 4v7h-4v-1h-4v1H6V4h12zM6 20v-7h12v7H6z" opacity=".3" />
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 2v7h-4v-1h-4v1H6V4h12zM6 20v-7h12v7H6z" />
      </SVGIcon>
    );
  }
);
