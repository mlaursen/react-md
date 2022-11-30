import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TurnRightSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m17.17 11-1.58 1.59L17 14l4-4-4-4-1.41 1.41L17.17 9H7v11h2v-9z" />
      </SVGIcon>
    );
  }
);
