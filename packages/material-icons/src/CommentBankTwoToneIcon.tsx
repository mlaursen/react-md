import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CommentBankTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="m4 18 2-2h14V4H4v14zm9-12h5v8l-2.5-1.5L13 14V6z"
          opacity=".3"
        />
        <path d="M18 14V6h-5v8l2.5-1.5z" />
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
      </SVGIcon>
    );
  }
);
