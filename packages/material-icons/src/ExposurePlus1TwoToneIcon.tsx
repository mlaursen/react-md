import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ExposurePlus1TwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 18V5h-.3L15 6.7v1.7l3-1.02V18zm-10-1v-4h4v-2h-4V7H8v4H4v2h4v4z" />
      </SVGIcon>
    );
  }
);