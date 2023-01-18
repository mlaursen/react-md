import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FolderOpenSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 6H12l-2-2H2v16h20V6zm-2 12H4V8h16v10z" />
      </SVGIcon>
    );
  }
);
