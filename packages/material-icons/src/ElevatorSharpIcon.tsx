import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ElevatorSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 3H3v18h18V3zM8.5 6a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm2.5 8h-1v4H7v-4H6V9.5h5V14zm4.5 3L13 13h5l-2.5 4zM13 11l2.5-4 2.5 4h-5z" />
      </SVGIcon>
    );
  }
);
