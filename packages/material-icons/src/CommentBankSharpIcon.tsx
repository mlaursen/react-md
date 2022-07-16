import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CommentBankSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M2 2v20l4-4h16V2H2zm17 11-2.5-1.5L14 13V5h5v8z" />
      </SVGIcon>
    );
  }
);