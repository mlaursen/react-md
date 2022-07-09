import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewColumnSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z" />
      </SVGIcon>
    );
  }
);
