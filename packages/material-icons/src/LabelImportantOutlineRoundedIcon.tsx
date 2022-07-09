import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LabelImportantOutlineRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 19H4.83c-.79 0-1.27-.88-.84-1.54L7.5 12 3.99 6.54C3.56 5.88 4.04 5 4.83 5H15c.65 0 1.26.31 1.63.84l3.96 5.58c.25.35.25.81 0 1.16l-3.96 5.58c-.37.52-.98.84-1.63.84zm-8.5-2H15l3.5-5L15 7H6.5l3.5 5-3.5 5z" />
      </SVGIcon>
    );
  }
);
