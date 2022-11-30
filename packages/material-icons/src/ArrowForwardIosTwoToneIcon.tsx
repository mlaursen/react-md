import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowForwardIosTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z" />
      </SVGIcon>
    );
  }
);
