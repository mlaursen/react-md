import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AlignHorizontalLeftIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 22H2V2h2v20zM22 7H6v3h16V7zm-6 7H6v3h10v-3z" />
      </SVGIcon>
    );
  }
);
