import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ElevatorRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8.5 6a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm2.5 7c0 .55-.45 1-1 1v3c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-3c-.55 0-1-.45-1-1v-1.5c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2V13zm6.52.76-1.6 2.56c-.2.31-.65.31-.85 0l-1.6-2.56c-.2-.33.04-.76.43-.76h3.2c.39 0 .63.43.42.76zM17.1 11h-3.2c-.39 0-.63-.43-.42-.77l1.6-2.56c.2-.31.65-.31.85 0l1.6 2.56c.2.34-.04.77-.43.77z" />
      </SVGIcon>
    );
  }
);
