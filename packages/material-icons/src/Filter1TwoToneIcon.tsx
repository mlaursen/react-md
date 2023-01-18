import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Filter1TwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 17h14V3H7v14zm5-12h4v10h-2V7h-2V5z" opacity=".3" />
        <path d="M14 15h2V5h-4v2h2zm7-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM1 5v16c0 1.1.9 2 2 2h16v-2H3V5H1z" />
      </SVGIcon>
    );
  }
);
