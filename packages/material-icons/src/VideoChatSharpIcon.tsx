import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VideoChatSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 2v20l4-4h16V2H2zm15 11-2-1.99V14H7V6h8v2.99L17 7v6z" />
      </SVGIcon>
    );
  }
);