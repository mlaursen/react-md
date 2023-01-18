import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DoorBackTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 19h10V5H7v14zm2-8h2v2H9v-2z" opacity=".3" />
        <path d="M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14H3v2h18v-2h-2zm-2 0H7V5h10v14z" />
        <path d="M9 11h2v2H9z" />
      </SVGIcon>
    );
  }
);
