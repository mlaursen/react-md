import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EdgesensorLowSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 7h2v7H2V7zm18 3h2v7h-2v-7zM6 2v20h12V2H6zm10 15H8V7h8v10z" />
      </SVGIcon>
    );
  }
);
