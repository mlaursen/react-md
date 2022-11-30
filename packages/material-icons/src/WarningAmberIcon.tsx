import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WarningAmberIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 5.99 19.53 19H4.47L12 5.99M12 2 1 21h22L12 2z" />
        <path d="M13 16h-2v2h2zm0-6h-2v5h2z" />
      </SVGIcon>
    );
  }
);
