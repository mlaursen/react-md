import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EditCalendarOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 10h14v2h2V6c0-1.1-.9-2-2-2h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h7v-2H5V10zm0-4h14v2H5V6zm17.84 10.28-.71.71-2.12-2.12.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41zm-3.54-.7 2.12 2.12-5.3 5.3H14v-2.12l5.3-5.3z" />
      </SVGIcon>
    );
  }
);
