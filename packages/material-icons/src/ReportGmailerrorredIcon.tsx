import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ReportGmailerrorredIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z" />
        <path d="M11 7h2v6h-2zm0 8h2v2h-2z" />
      </SVGIcon>
    );
  }
);