import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DeleteForeverRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zm3.17-7.83a.996.996 0 0 1 1.41 0L12 12.59l1.42-1.42a.996.996 0 1 1 1.41 1.41L13.41 14l1.42 1.42a.996.996 0 1 1-1.41 1.41L12 15.41l-1.42 1.42a.996.996 0 1 1-1.41-1.41L10.59 14l-1.42-1.42a.996.996 0 0 1 0-1.41zM15.5 4l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" />
      </SVGIcon>
    );
  }
);