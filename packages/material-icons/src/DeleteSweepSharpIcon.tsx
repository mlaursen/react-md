import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DeleteSweepSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 16h4v2h-4v-2zm0-8h7v2h-7V8zm0 4h6v2h-6v-2zM3 20h10V8H3v12zM14 5h-3l-1-1H6L5 5H2v2h12V5z" />
      </SVGIcon>
    );
  }
);