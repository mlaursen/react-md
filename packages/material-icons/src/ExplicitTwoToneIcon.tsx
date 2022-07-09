import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ExplicitTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M5 19h14V5H5v14zM9 7h6v2h-4v2h4v2h-4v2h4v2H9V7z"
          opacity=".3"
        />
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H5V5h14v14zm-4-4h-4v-2h4v-2h-4V9h4V7H9v10h6z" />
      </SVGIcon>
    );
  }
);
