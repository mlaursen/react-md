import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MeetingRoomRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 19h-1V5c0-.55-.45-1-1-1h-4c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v15H4c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1V6h3v14c0 .55.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1zm-8-6h-2v-2h2v2z" />
      </SVGIcon>
    );
  }
);
