import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WbTwighlightIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m16.954 8.66 2.12-2.12 1.415 1.414-2.13 2.12zM17.9 14c-.5-2.85-2.95-5-5.9-5s-5.45 2.15-5.9 5h11.8zM2 16h20v4H2zm9-12h2v3h-2zM3.54 7.925 4.954 6.51l2.122 2.122-1.415 1.415z" />
      </SVGIcon>
    );
  }
);
