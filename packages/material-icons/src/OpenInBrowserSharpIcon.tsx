import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function OpenInBrowserSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 4v16h6v-2H5V8h14v10h-4v2h6V4H3zm9 6-4 4h3v6h2v-6h3l-4-4z" />
      </SVGIcon>
    );
  }
);
