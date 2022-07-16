import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function RoomServiceSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2 17h20v2H2v-2zm11.84-9.21A2.006 2.006 0 0 0 12 5a2.006 2.006 0 0 0-1.84 2.79C6.25 8.6 3.27 11.93 3 16h18c-.27-4.07-3.25-7.4-7.16-8.21z" />
      </SVGIcon>
    );
  }
);