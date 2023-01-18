import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Filter3SharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M23 1H5v18h18V1zm-2 16H7V3h14v14zM3 5H1v18h18v-2H3V5zm14 10V5h-6v2h4v2h-2v2h2v2h-4v2h6z" />
      </SVGIcon>
    );
  }
);
