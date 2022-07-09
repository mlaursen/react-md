import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CalendarTodaySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 3h-3V1h-2v2H7V1H5v2H2v20h20V3zm-2 18H4V8h16v13z" />
      </SVGIcon>
    );
  }
);
