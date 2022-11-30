import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function OfflineShareSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 5H4v18h12v-2H6z" />
        <path d="M20 1H8v18h12V1zm-2 14h-8V5h8v10z" />
        <path d="M12.5 10.25h2V12L17 9.5 14.5 7v1.75H11V12h1.5z" />
      </SVGIcon>
    );
  }
);
