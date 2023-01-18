import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CommentBankSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 2v20l4-4h16V2H2zm17 11-2.5-1.5L14 13V5h5v8z" />
      </SVGIcon>
    );
  }
);
