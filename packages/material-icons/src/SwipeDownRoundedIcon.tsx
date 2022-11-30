import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SwipeDownRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M8.83 19.1c-.26-.6.09-1.28.73-1.41l3.58-.71-4.35-9.81c-.34-.76 0-1.64.76-1.98.76-.34 1.64 0 1.98.76l2.43 5.49.84-.37c.28-.13.59-.18.9-.17l4.56.21a2 2 0 0 1 1.83 1.45l1.23 4.33c.27.96-.2 1.97-1.11 2.37l-5.63 2.49c-.48.21-1.26.33-1.76.14l-5.45-2.27a.952.952 0 0 1-.54-.52zM5.59 2.73A11.924 11.924 0 0 0 3.5 9.5c0 .92.1 1.82.3 2.68l-1.19-1.19c-.29-.29-.77-.32-1.07-.04a.76.76 0 0 0-.02 1.08l2.26 2.26c.39.39 1.02.39 1.41 0l2.24-2.24c.29-.29.32-.77.04-1.07a.76.76 0 0 0-1.08-.02L5.3 12.05c-.19-.81-.3-1.67-.3-2.55 0-2.2.68-4.24 1.83-5.93.2-.3.17-.7-.09-.95a.745.745 0 0 0-1.15.11z" />
      </SVGIcon>
    );
  }
);
