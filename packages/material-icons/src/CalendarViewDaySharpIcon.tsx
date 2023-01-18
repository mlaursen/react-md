import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CalendarViewDaySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 17h18v2H3v-2zm0-7h18v5H3v-5zm0-4h18v2H3V6z" />
      </SVGIcon>
    );
  }
);
