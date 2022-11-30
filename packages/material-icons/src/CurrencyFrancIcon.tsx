import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CurrencyFrancIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 5V3H7v13H5v2h2v3h2v-3h4v-2H9v-3h8v-2H9V5z" />
      </SVGIcon>
    );
  }
);
