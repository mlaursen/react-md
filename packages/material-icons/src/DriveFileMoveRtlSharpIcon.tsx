import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DriveFileMoveRtlSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 6H12l-2-2H2v16h20V6zM12 17l-4-4 4-4v3h4v2h-4v3z" />
      </SVGIcon>
    );
  }
);
