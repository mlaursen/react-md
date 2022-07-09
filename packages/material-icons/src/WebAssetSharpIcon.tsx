import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WebAssetSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 4v16h18V4H3zm16 14H5V8h14v10z" />
      </SVGIcon>
    );
  }
);
