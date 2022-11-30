import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ReplayCircleFilledRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 10.74c-.12 3.09-2.67 5.64-5.76 5.76a5.995 5.995 0 0 1-6.12-4.82c-.13-.61.36-1.18.98-1.18.47 0 .88.33.98.8a3.997 3.997 0 0 0 4.72 3.12c1.56-.3 2.82-1.56 3.12-3.12A4 4 0 0 0 12 8.5v1.79c0 .45-.54.67-.85.35l-2.8-2.79c-.2-.2-.2-.51 0-.71l2.79-2.79c.32-.31.86-.09.86.36V6.5a6.01 6.01 0 0 1 6 6.24z" />
      </SVGIcon>
    );
  }
);
