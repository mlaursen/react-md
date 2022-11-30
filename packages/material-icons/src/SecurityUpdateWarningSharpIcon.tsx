import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SecurityUpdateWarningSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M11 15h2v2h-2zm0-8h2v6h-2z" />
        <path d="M5.01 1v22H19V1H5.01zM17 18H7V6h10v12z" />
      </SVGIcon>
    );
  }
);
