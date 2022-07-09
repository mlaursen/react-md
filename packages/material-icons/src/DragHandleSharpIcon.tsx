import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DragHandleSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
      </SVGIcon>
    );
  }
);
