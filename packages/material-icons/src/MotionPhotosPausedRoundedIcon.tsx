import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function MotionPhotosPausedRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M21.96 11.05c.58 6.26-4.64 11.48-10.9 10.9-4.43-.41-8.12-3.85-8.9-8.23a9.58 9.58 0 0 1 .12-4.04 1 1 0 0 1 1.31-.7c.47.17.75.67.63 1.16-.2.82-.27 1.7-.19 2.61.37 4.04 3.89 7.25 7.95 7.26 4.79.01 8.61-4.21 7.94-9.12-.51-3.7-3.66-6.62-7.39-6.86-.83-.06-1.63.02-2.38.2a.998.998 0 0 1-1.16-.64c-.2-.56.12-1.17.69-1.31 1.79-.43 3.75-.41 5.78.37 3.56 1.35 6.15 4.62 6.5 8.4zM5.5 4C4.67 4 4 4.67 4 5.5S4.67 7 5.5 7 7 6.33 7 5.5 6.33 4 5.5 4zM11 15V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1zm4 0V9c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1z" />
      </SVGIcon>
    );
  }
);
