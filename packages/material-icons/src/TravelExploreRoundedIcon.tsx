import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TravelExploreRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M19.3 16.9c.58-1.01.95-2.23.51-3.65-.53-1.72-2.04-3.05-3.84-3.22a4.498 4.498 0 0 0-4.95 4.95c.18 1.79 1.5 3.31 3.22 3.84 1.43.44 2.64.07 3.65-.51l2.5 2.5c.39.39 1.01.39 1.4 0a.984.984 0 0 0 0-1.4L19.3 16.9zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zM12 20v2C6.48 22 2 17.52 2 12S6.48 2 12 2c4.84 0 8.87 3.44 9.8 8h-2.07A8 8 0 0 0 15 4.59V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h2v3H9l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.41 3.59 8 8 8z" />
      </SVGIcon>
    );
  }
);
