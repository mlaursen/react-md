import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function UnfoldLessDoubleRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m14.46 5.7-2.47 2.46L9.53 5.7a.996.996 0 1 0-1.41 1.41l3.17 3.18c.39.39 1.02.39 1.41 0l3.17-3.18a.996.996 0 1 0-1.41-1.41z" />
        <path d="m14.46.7-2.47 2.46L9.53.7a.996.996 0 1 0-1.41 1.41l3.17 3.18c.39.39 1.02.39 1.41 0l3.17-3.18A.996.996 0 1 0 14.46.7zM9.54 23.3l2.47-2.46 2.46 2.46a.996.996 0 1 0 1.41-1.41l-3.17-3.18a.996.996 0 0 0-1.41 0l-3.17 3.18a.996.996 0 1 0 1.41 1.41z" />
        <path d="m9.54 18.29 2.47-2.45 2.46 2.46a.996.996 0 1 0 1.41-1.41l-3.17-3.18a.996.996 0 0 0-1.41 0l-3.17 3.17a.996.996 0 1 0 1.41 1.41z" />
      </SVGIcon>
    );
  }
);