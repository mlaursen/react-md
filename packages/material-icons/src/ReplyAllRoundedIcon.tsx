import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ReplyAllRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 7.56c0-.94-1.14-1.42-1.81-.75L.71 11.29a.996.996 0 0 0 0 1.41l4.48 4.48c.67.68 1.81.2 1.81-.74 0-.28-.11-.55-.31-.75L3 12l3.69-3.69c.2-.2.31-.47.31-.75zM13 9V7.41c0-.89-1.08-1.34-1.71-.71L6.7 11.29a.996.996 0 0 0 0 1.41l4.59 4.59c.63.63 1.71.18 1.71-.71V14.9c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
      </SVGIcon>
    );
  }
);
