import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AddTaskRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="m21.29 5.89-10 10a.996.996 0 0 1-1.41 0l-2.83-2.83a.996.996 0 1 1 1.41-1.41l2.12 2.12 9.29-9.29a.996.996 0 0 1 1.41 0c.4.39.4 1.02.01 1.41zM12 20c-4.71 0-8.48-4.09-7.95-8.9.39-3.52 3.12-6.41 6.61-6.99 1.81-.3 3.53.02 4.99.78a1.003 1.003 0 0 0 .93-1.78c-1.47-.75-3.13-1.16-4.9-1.11-5.14.16-9.41 4.34-9.67 9.47C1.72 17.24 6.3 22 12 22c1.2 0 2.34-.21 3.41-.6.68-.25.87-1.13.35-1.65a.98.98 0 0 0-1.04-.23c-.85.31-1.77.48-2.72.48zm7-5h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2v-2c0-.55-.45-1-1-1s-1 .45-1 1v2z" />
      </SVGIcon>
    );
  }
);
