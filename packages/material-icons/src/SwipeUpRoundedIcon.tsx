import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SwipeUpRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M8.83 19.1c-.26-.6.09-1.28.73-1.41l3.58-.71-4.35-9.81c-.34-.76 0-1.64.76-1.98.76-.34 1.64 0 1.98.76l2.43 5.49.84-.37c.28-.13.59-.18.9-.17l4.56.21a2 2 0 0 1 1.83 1.45l1.23 4.33c.27.96-.2 1.97-1.11 2.37l-5.63 2.49c-.48.21-1.26.33-1.76.14l-5.45-2.27a.952.952 0 0 1-.54-.52zm-2.08-5.72c.26-.26.29-.66.09-.95a10.44 10.44 0 0 1-1.52-8.49l1.09 1.09c.3.3.79.29 1.08-.02.28-.3.25-.78-.04-1.07L5.21 1.71a.996.996 0 0 0-1.41 0L1.53 3.97c-.3.3-.29.79.02 1.08.3.28.78.25 1.07-.04L3.8 3.82c-.2.86-.3 1.76-.3 2.68 0 2.51.77 4.85 2.09 6.77.27.39.82.45 1.16.11z" />
      </SVGIcon>
    );
  }
);
