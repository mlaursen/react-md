import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EdgesensorHighSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 7h2v7H3V7zm-3 3h2v7H0v-7zm22-3h2v7h-2V7zm-3 3h2v7h-2v-7zm-1-8H6v20h12V2zm-2 15H8V7h8v10z" />
      </SVGIcon>
    );
  }
);
