import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HardwareSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m18 3-3 3V3H9C6.24 3 4 5.24 4 8h5v3h6V8l3 3h2V3h-2zM9 13v8h6v-8H9z" />
      </SVGIcon>
    );
  }
);