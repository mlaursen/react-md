import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FileCopySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 1H2v16h2V3h12V1zm-1 4 6 6v12H6V5h9zm-1 7h5.5L14 6.5V12z" />
      </SVGIcon>
    );
  }
);
