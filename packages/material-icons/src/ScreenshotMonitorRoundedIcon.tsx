import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ScreenshotMonitorRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 3H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h4v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h4c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm0 14H4V5h16v12z" />
        <path d="M6.5 7.5h1.75c.41 0 .75-.34.75-.75S8.66 6 8.25 6H6c-.55 0-1 .45-1 1v2.25c0 .41.34.75.75.75s.75-.34.75-.75V7.5zM18.25 12c-.41 0-.75.34-.75.75v1.75h-1.75c-.41 0-.75.34-.75.75s.34.75.75.75H18c.55 0 1-.45 1-1v-2.25c0-.41-.34-.75-.75-.75z" />
      </SVGIcon>
    );
  }
);
