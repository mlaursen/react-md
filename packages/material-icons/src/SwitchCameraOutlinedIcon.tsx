import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SwitchCameraOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.88 4h4.24l1.83 2H20v12H4V6h4.05" />
        <path d="M15 11H9V8.5L5.5 12 9 15.5V13h6v2.5l3.5-3.5L15 8.5z" />
      </SVGIcon>
    );
  }
);
