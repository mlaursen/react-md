import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ExposureNeg1TwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19 18V5h-.3L14 6.7v1.7l3-1.02V18zM4 11h8v2H4z" />
      </SVGIcon>
    );
  }
);
