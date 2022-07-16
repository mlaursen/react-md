import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TransitEnterexitOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 18H6V8h3v4.77L15.98 6 18 8.03 11.15 15H16v3z" />
      </SVGIcon>
    );
  }
);