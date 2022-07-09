import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlaylistAddTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 14h8v2H2zm0-4h12v2H2zm0-4h12v2H2zm16 4h-2v4h-4v2h4v4h2v-4h4v-2h-4z" />
      </SVGIcon>
    );
  }
);
