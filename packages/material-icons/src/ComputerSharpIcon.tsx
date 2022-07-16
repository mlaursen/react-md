import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ComputerSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m20 18 2-2V4H2v12l2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
      </SVGIcon>
    );
  }
);