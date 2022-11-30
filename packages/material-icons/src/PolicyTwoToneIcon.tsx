import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PolicyTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M5 6.3V11c0 4.52 2.98 8.69 7 9.93 1.74-.53 3.28-1.62 4.47-3.04l-1.72-1.72a4.994 4.994 0 0 1-6.29-.64 5.003 5.003 0 0 1 0-7.07 5.003 5.003 0 0 1 7.07 0 5.006 5.006 0 0 1 .64 6.29l1.45 1.45C18.49 14.65 19 12.85 19 11V6.3l-7-3.11L5 6.3z"
          opacity=".3"
        />
        <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 .65-.16 1.27-.38 1.87-.65 1.8-.82 3.36-2.13 4.57-3.74C20.04 16.46 21 13.77 21 11V5l-9-4zm7 10c0 1.85-.51 3.65-1.38 5.21l-1.45-1.45a4.994 4.994 0 0 0-.64-6.29 5.003 5.003 0 0 0-7.07 0 5.003 5.003 0 0 0 0 7.07 5.006 5.006 0 0 0 6.29.64l1.72 1.72c-1.19 1.42-2.73 2.51-4.47 3.04-4.02-1.25-7-5.42-7-9.94V6.3l7-3.11 7 3.11V11zm-4 1c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
      </SVGIcon>
    );
  }
);
