import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function UpgradeOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 18v2H8v-2h8zM11 7.99V16h2V7.99h3L12 4 8 7.99h3z" />
      </SVGIcon>
    );
  }
);
