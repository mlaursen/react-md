import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HorizontalDistributeIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 22H2V2h2v20zM22 2h-2v20h2V2zm-8.5 5h-3v10h3V7z" />
      </SVGIcon>
    );
  }
);
