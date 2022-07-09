import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WarningAmberSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 5.99 19.53 19H4.47L12 5.99M12 2 1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
      </SVGIcon>
    );
  }
);
