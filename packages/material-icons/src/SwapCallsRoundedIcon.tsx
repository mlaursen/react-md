import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SwapCallsRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m17.65 4.35-2.79 2.79c-.32.32-.1.86.35.86H17v6.88c0 1-.67 1.93-1.66 2.09-1.25.21-2.34-.76-2.34-1.97V8.17c0-2.09-1.53-3.95-3.61-4.15A3.998 3.998 0 0 0 5 8v7H3.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79a.5.5 0 0 0-.36-.85H7V8.12c0-1 .67-1.93 1.66-2.09C9.91 5.82 11 6.79 11 8v6.83c0 2.09 1.53 3.95 3.61 4.15C16.99 19.21 19 17.34 19 15V8h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z" />
      </SVGIcon>
    );
  }
);
