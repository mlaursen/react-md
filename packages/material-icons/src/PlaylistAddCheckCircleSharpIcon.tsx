import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlaylistAddCheckCircleSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 7h7v2H7V7zm0 3h7v2H7v-2zm3 5H7v-2h3v2zm4.05 3.36-2.83-2.83 1.41-1.41 1.41 1.41L17.59 12 19 13.41l-4.95 4.95z" />
      </SVGIcon>
    );
  }
);
