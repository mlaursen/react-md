import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AlignVerticalBottomTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 22H2v-2h20v2zM10 2H7v16h3V2zm7 6h-3v10h3V8z" />
      </SVGIcon>
    );
  }
);
