import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SpatialAudioOffRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <circle cx="10" cy="9" r="4" />
        <path d="M16.39 15.56C14.71 14.7 12.53 14 10 14s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 2 18.22V19c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-.78c0-1.12-.61-2.15-1.61-2.66zm4.72-13.71a.997.997 0 0 0-1.5-.09c-.35.35-.39.91-.09 1.3 1.17 1.5 2.64 5.23 0 8.61-.3.39-.26.95.09 1.3.43.43 1.13.38 1.5-.09 1.5-1.93 3.35-6.72 0-11.03zm-2.8 2.99a1.01 1.01 0 0 0-1.58-.21c-.33.33-.36.84-.13 1.25.25.44.74 1.69-.01 2.99-.23.4-.19.9.14 1.22.47.47 1.25.35 1.58-.22 1.16-1.99.58-4.02 0-5.03z" />
      </SVGIcon>
    );
  }
);
