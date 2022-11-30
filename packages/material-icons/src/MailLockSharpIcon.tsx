import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MailLockSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 9.97V4H2.01L2 20h14v-5.03c0-2.76 2.24-5 5-5h1zM20 8l-8 5-8-5V6l8 5 8-5v2z" />
        <path d="M23 15v-.89c0-1-.68-1.92-1.66-2.08A2 2 0 0 0 19 14v1h-1v5h6v-5h-1zm-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1v1z" />
      </SVGIcon>
    );
  }
);
