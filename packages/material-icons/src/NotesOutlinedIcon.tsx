import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NotesOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M21 11.01 3 11v2h18zM3 16h12v2H3zM21 6H3v2.01L21 8z" />
      </SVGIcon>
    );
  }
);
