import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NoMeetingRoomOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 5v3.88l2 2V6h3v7.88l2 2V4h-5V3H6.12l2 2zM2.41 2.13 1 3.54l4 4V19H3v2h11v-4.46L20.46 23l1.41-1.41L2.41 2.13zM12 19H7V9.54l5 5V19z" />
      </SVGIcon>
    );
  }
);
