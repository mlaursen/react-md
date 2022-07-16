import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EditLocationRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="m18.11 1.77.96-.96a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.96.96-2.12-2.12zm-1 1 2.12 2.12-5.97 5.97a.51.51 0 0 1-.35.15H11.5c-.28 0-.5-.22-.5-.5V9.1c0-.13.05-.26.15-.35l5.96-5.98zm-1.98-.13L9.79 7.98c-.18.19-.29.44-.29.71v2.83c0 .55.45 1 1 1h2.83c.27 0 .52-.11.71-.29l5.33-5.33c.4.98.63 2.09.63 3.31 0 3.18-2.45 6.92-7.34 11.23-.38.33-.95.33-1.33 0C6.45 17.13 4 13.39 4 10.21c0-4.98 3.8-8.2 8-8.2 1.09 0 2.16.22 3.13.63z" />
      </SVGIcon>
    );
  }
);