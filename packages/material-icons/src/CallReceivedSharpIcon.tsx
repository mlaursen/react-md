import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CallReceivedSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 5.41 18.59 4 7 15.59V9H5v10h10v-2H8.41L20 5.41z" />
      </SVGIcon>
    );
  }
);
