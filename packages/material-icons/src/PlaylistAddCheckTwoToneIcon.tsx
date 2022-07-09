import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlaylistAddCheckTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 6h12v2H2zm0 4h12v2H2zm0 4h8v2H2zm14.01 3L13 14l-1.5 1.5 4.51 4.5L23 13l-1.5-1.5z" />
      </SVGIcon>
    );
  }
);
