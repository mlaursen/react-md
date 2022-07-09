import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CommentBankRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <g fill="none">
          <path d="M0 0h24v24H0z" />
          <path d="M0 0h24v24H0z" />
        </g>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 11-2.5-1.5L14 13V5h5v8z" />
      </SVGIcon>
    );
  }
);
