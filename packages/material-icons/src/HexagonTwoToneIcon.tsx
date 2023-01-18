import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HexagonTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16.05 19h-8.1l-4.04-7 4.04-7h8.1l4.04 7z" opacity=".3" />
        <path d="M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9-5.2-9zm-1.15 16h-8.1l-4.04-7 4.04-7h8.09l4.04 7-4.03 7z" />
      </SVGIcon>
    );
  }
);
