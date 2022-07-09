import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewCarouselRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M8 19h8c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v13c0 .55.45 1 1 1zm-5-2h2c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1zM18 7v9c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1z" />
      </SVGIcon>
    );
  }
);
