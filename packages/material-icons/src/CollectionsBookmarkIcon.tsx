import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CollectionsBookmarkIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10-2.5-1.5L15 12V4h5v8z" />
      </SVGIcon>
    );
  }
);
