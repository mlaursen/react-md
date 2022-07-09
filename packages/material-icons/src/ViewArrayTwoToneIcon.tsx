import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewArrayTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 5h3v13H4zm14 0h3v13h-3zM8 18h9V5H8v13zm2-11h5v9h-5V7z" />
        <path d="M10 7h5v9h-5z" opacity=".3" />
      </SVGIcon>
    );
  }
);
