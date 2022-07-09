import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SwitchRightSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M24 24H0V0h24z" />
        <path d="M15.5 15.38V8.62L18.88 12l-3.38 3.38M14 19l7-7-7-7v14zm-4 0V5l-7 7 7 7z" />
      </SVGIcon>
    );
  }
);
