import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function RamenDiningSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 3.51V2L4 3.99V12H2c0 3.69 2.47 6.86 6 8.25V22h8v-1.75c3.53-1.39 6-4.56 6-8.25H10.5V8H22V6.5H10.5V4.78L22 3.51zM6.5 5.22V6.5h-1V5.34l1-.12zM5.5 8h1v4h-1V8zM9 12H8V8h1v4zm0-5.5H8V5.06l1-.11V6.5z" />
      </SVGIcon>
    );
  }
);
