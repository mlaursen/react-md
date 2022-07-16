import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CellWifiTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m22 5.97-4 4.01v2.8l2-2V20h-2v2h4z" opacity=".3" />
        <path d="M9.07 11.07 11 13l1.93-1.93a2.74 2.74 0 0 0-3.86 0zm9.01-5.14c-3.91-3.91-10.25-3.91-14.15 0l1.29 1.29c3.19-3.19 8.38-3.19 11.57 0l1.29-1.29zM15.5 8.5a6.374 6.374 0 0 0-9 0l1.29 1.29c1.77-1.77 4.65-1.77 6.43 0L15.5 8.5zm2.5 4.28v-2.8L6 22h12v-2.05z" />
      </SVGIcon>
    );
  }
);