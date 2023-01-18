import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DriveFolderUploadSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 6H12l-2-2H2v16h20V6zm-9 7v4h-2v-4H8l4.01-4L16 13h-3z" />
      </SVGIcon>
    );
  }
);
