import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ScheduleSendIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16.5 12.5H15v4l3 2 .75-1.23-2.25-1.52V12.5zM16 9 2 3v7l9 2-9 2v7l7.27-3.11C10.09 20.83 12.79 23 16 23c3.86 0 7-3.14 7-7s-3.14-7-7-7zm0 12c-2.75 0-4.98-2.22-5-4.97v-.07a5.008 5.008 0 0 1 5-4.97c2.76 0 5 2.24 5 5S18.76 21 16 21z" />
      </SVGIcon>
    );
  }
);
