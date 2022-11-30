import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AirplaneTicketTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M4.01 8.54C5.2 9.23 6 10.52 6 12c0 1.47-.81 2.77-2 3.46V18h16V6H4l.01 2.54zm4.13 3.99 1.26.99 2.39-.64-2.4-4.16 1.4-.38 4.01 3.74 2.44-.65a.967.967 0 0 1 1.18.68.988.988 0 0 1-.69 1.19l-8.86 2.36-1.66-2.88.93-.25z"
          opacity=".3"
        />
        <path d="M20.19 4H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.81-2-1.81-2zM20 18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v12z" />
        <path d="M17.73 13.3c.52-.15.82-.68.69-1.19a.967.967 0 0 0-1.18-.68l-2.44.65-4.01-3.74-1.4.38 2.4 4.16-2.39.64-1.26-.99-.93.25 1.66 2.88 8.86-2.36z" />
      </SVGIcon>
    );
  }
);
