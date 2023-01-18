import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AdfScannerRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 12h-1V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v6H5c-1.66 0-3 1.34-3 3v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3c0-1.66-1.34-3-3-3zm-3 0H8V6h8v6zm2 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </SVGIcon>
    );
  }
);
