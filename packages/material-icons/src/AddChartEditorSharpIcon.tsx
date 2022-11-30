import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AddChartEditorSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 19H5V5h9V3H3v18h18V10h-2z" />
        <path d="M11 7h2v10h-2zm4 6h2v4h-2zm-8-3h2v7H7zm12-5V3h-2v2h-2v2h2v2h2V7h2V5z" />
      </SVGIcon>
    );
  }
);