import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SwitchAccessShortcutRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7.06 8.94 5 8l2.06-.94L8 5l.94 2.06L11 8l-2.06.94L8 11l-.94-2.06zM8 21l.94-2.06L11 18l-2.06-.94L8 15l-.94 2.06L5 18l2.06.94L8 21zm-3.63-8.63L3 13l1.37.63L5 15l.63-1.37L7 13l-1.37-.63L5 11l-.63 1.37zM19 20.41a1 1 0 0 1-1.51.86C14.21 19.36 12 15.79 12 12c0-2.73 1.08-5.27 2.75-7.25l-1.9-1.9a.5.5 0 0 1 .36-.85h5.29c.28 0 .5.22.5.5v5.29c0 .45-.54.67-.85.35l-1.97-1.97C14.84 7.82 14 9.88 14 12c0 3.13 1.86 6.01 4.51 7.55.3.18.49.51.49.86z" />
      </SVGIcon>
    );
  }
);
