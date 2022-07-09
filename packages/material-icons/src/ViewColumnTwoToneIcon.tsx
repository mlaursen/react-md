import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewColumnTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 7h3v9H6zm5 0h3v9h-3zm5 0h3v9h-3z" opacity=".3" />
        <path d="M4 5v13h17V5H4zm5 11H6V7h3v9zm5 0h-3V7h3v9zm5 0h-3V7h3v9z" />
      </SVGIcon>
    );
  }
);
