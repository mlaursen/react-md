import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewColumnOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 5v13h17V5H4zm10 2v9h-3V7h3zM6 7h3v9H6V7zm13 9h-3V7h3v9z" />
      </SVGIcon>
    );
  }
);
