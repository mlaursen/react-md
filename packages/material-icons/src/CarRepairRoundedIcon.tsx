import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CarRepairRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 15v-1h10v1c0 .55.45 1 1 1s1-.45 1-1V8.69L17.44 4c-.05-.16-.12-.29-.19-.4-.02-.02-.03-.04-.05-.07-.38-.52-.92-.53-.92-.53H7.72s-.54.01-.92.54c-.02.02-.03.04-.05.06-.07.11-.14.24-.19.4L5 8.69V15c0 .55.45 1 1 1s1-.45 1-1zm2-3.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM8.33 5h7.34l.23.69.43 1.31H7.67l.66-2zM4 18.01c0 .54.45.99.99.99H11v2.01c0 .55.45.99.99.99H12c.55 0 .99-.45.99-.99V19H19c.55 0 .99-.45.99-.99 0-.55-.45-.99-.99-.99H4.99a.986.986 0 0 0-.99.99z" />
      </SVGIcon>
    );
  }
);
