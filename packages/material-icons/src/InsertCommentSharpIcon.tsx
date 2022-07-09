import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function InsertCommentSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 2H2v16h16l4 4V2zm-4 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </SVGIcon>
    );
  }
);
