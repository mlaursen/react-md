import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MarkunreadMailboxSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 6H10v6H8V4h6V0H6v6H2v16h20V6z" />
      </SVGIcon>
    );
  }
);
