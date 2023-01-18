import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BookmarksSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m19 18 2 1V1H7v2h12v15zM17 5H3v18l7-3 7 3V5z" />
      </SVGIcon>
    );
  }
);
