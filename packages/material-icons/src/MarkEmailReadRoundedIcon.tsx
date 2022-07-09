import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MarkEmailReadRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M18.05 21.29a.996.996 0 0 1-1.41 0l-2.12-2.12a.996.996 0 1 1 1.41-1.41l1.41 1.41 3.54-3.54a.996.996 0 1 1 1.41 1.41l-4.24 4.25zM12.08 20H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v6.68A6.995 6.995 0 0 0 12 19c0 .34.03.67.08 1zm-.61-7.33c.32.2.74.2 1.06 0l7.07-4.42a.85.85 0 1 0-.9-1.44L12 11 5.3 6.81a.85.85 0 1 0-.9 1.44l7.07 4.42z" />
      </SVGIcon>
    );
  }
);
