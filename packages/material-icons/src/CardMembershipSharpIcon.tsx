import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CardMembershipSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 2H2v15h6v5l4-2 4 2v-5h6V2zm-2 13H4v-2h16v2zm0-5H4V4h16v6z" />
      </SVGIcon>
    );
  }
);
