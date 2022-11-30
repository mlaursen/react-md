import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TurnSharpLeftSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 6.83 4.41 8.41 3 7l4-4 4 4-1.41 1.41L8 6.83V13h10v8h-2v-6H6z" />
      </SVGIcon>
    );
  }
);
