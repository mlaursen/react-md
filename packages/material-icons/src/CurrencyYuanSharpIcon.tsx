import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CurrencyYuanSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M13.28 12H18v2h-5v7h-2v-7H6v-2h4.72L5 3h2.37L12 10.29 16.63 3H19z" />
      </SVGIcon>
    );
  }
);
