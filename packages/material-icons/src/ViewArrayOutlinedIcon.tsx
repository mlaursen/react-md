import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewArrayOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 7v9h-5V7h5m6-2h-3v13h3V5zm-4 0H8v13h9V5zM7 5H4v13h3V5z" />
      </SVGIcon>
    );
  }
);
