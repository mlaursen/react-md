import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SmartButtonRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M22 9v6c0 1.1-.9 2-2 2h-1v-2h1V9H4v6h6v2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-7.96 8.99a.5.5 0 0 0 .91 0l.63-1.4 1.4-.63a.5.5 0 0 0 0-.91l-1.4-.63-.63-1.4a.5.5 0 0 0-.91 0l-.63 1.4-1.4.63a.5.5 0 0 0 0 .91l1.4.63.63 1.4zm2.7-4.56c.1.22.42.22.52 0l.36-.8.8-.36c.22-.1.22-.42 0-.52l-.8-.36-.36-.8a.287.287 0 0 0-.52 0l-.36.8-.8.36c-.22.1-.22.42 0 .52l.8.36.36.8z" />
      </SVGIcon>
    );
  }
);