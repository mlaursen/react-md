import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Filter6TwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M7 17h14V3H7v14zm4-10a2 2 0 0 1 2-2h4v2h-4v2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7zm2 4h2v2h-2z"
          opacity=".3"
        />
        <path d="M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V7h4V5h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm0-4h2v2h-2v-2zM3 23h16v-2H3V5H1v16c0 1.1.9 2 2 2z" />
      </SVGIcon>
    );
  }
);
