import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BookmarkAddSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 7h-2v2h-2V7h-2V5h2V3h2v2h2v2zm-2 14-7-3-7 3V3h9a5.002 5.002 0 0 0 5 7.9V21z" />
      </SVGIcon>
    );
  }
);
