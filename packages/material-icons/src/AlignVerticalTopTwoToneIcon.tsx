import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AlignVerticalTopTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 2v2H2V2h20zM7 22h3V6H7v16zm7-6h3V6h-3v10z" />
      </SVGIcon>
    );
  }
);
