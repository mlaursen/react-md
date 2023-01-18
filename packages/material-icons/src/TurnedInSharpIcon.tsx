import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TurnedInSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 3H5v18l7-3 7 3V3z" />
      </SVGIcon>
    );
  }
);
