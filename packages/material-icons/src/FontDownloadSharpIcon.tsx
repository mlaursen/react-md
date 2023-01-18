import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FontDownloadSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9.93 13.5h4.14L12 7.98 9.93 13.5zM22 2H2v20h20V2zm-6.05 16.5-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z" />
      </SVGIcon>
    );
  }
);
