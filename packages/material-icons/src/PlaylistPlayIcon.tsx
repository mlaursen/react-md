import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlaylistPlayIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" />
      </SVGIcon>
    );
  }
);
