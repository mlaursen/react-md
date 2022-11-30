import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PlayDisabledRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2.1 3.51a.996.996 0 0 0 0 1.41l5.9 5.9v6.35c0 .79.87 1.27 1.54.84l3.45-2.2 6.08 6.08a.996.996 0 1 0 1.41-1.41L3.51 3.51a.996.996 0 0 0-1.41 0zm15.58 9.33a1 1 0 0 0 0-1.69L9.54 5.98a1.01 1.01 0 0 0-.84-.11l7.75 7.75 1.23-.78z" />
      </SVGIcon>
    );
  }
);
