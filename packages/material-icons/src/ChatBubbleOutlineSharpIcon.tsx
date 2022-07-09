import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ChatBubbleOutlineSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 2H2v20l4-4h16V2zm-2 14H6l-2 2V4h16v12z" />
      </SVGIcon>
    );
  }
);
