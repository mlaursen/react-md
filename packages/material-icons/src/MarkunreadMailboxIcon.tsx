import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MarkunreadMailboxIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M-618-3000H782V600H-618zM0 0h24v24H0z" fill="none" />
        <path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </SVGIcon>
    );
  }
);
