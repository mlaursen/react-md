import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DriveFileMoveSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 6H12l-2-2H2v16h20V6zM12 17v-3H8v-2h4V9l4 4-4 4z" />
      </SVGIcon>
    );
  }
);
