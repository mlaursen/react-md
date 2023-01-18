import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PaddingTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M5 19h14V5H5v14zM15 7h2v2h-2V7zm-4 0h2v2h-2V7zM7 7h2v2H7V7z"
          opacity=".3"
        />
        <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm16 14H5V5h14v14z" />
        <path d="M15 7h2v2h-2zM7 7h2v2H7zm4 0h2v2h-2z" />
      </SVGIcon>
    );
  }
);
