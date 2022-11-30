import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function OfflineShareTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 5H4v16c0 1.1.9 2 2 2h10v-2H6V5z" />
        <path d="M18 1h-8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16h-8v-1h8v1zm0-3h-8V6h8v8zm0-10h-8V3h8v1z" />
        <path d="M12.5 10.25h2V12L17 9.5 14.5 7v1.75H12c-.55 0-1 .45-1 1V12h1.5v-1.75z" />
      </SVGIcon>
    );
  }
);
