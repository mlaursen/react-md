import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VoiceChatSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 2H2.01L2 22l4-4h16V2zm-4 12-4-3.2V14H6V6h8v3.2L18 6v8z" />
      </SVGIcon>
    );
  }
);
