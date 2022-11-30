import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function OutputRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m17.71 16.29 3.59-3.59a.996.996 0 0 0 0-1.41L17.71 7.7a.996.996 0 1 0-1.41 1.41L18.17 11H10c-.55 0-1 .45-1 1s.45 1 1 1h8.17l-1.88 1.88a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.42 0z" />
        <path d="M19 19H5V5h14v1c0 .55.45 1 1 1s1-.45 1-1V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-1c0-.55-.45-1-1-1s-1 .45-1 1v1z" />
      </SVGIcon>
    );
  }
);
