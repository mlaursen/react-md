import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function InstallMobileSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 18H7V6h7V1H5v22h14v-7h-2z" />
        <path d="m18 14 5-5-1.41-1.41L19 10.17V3h-2v7.17l-2.59-2.58L13 9z" />
      </SVGIcon>
    );
  }
);
