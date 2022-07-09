import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SportsBasketballOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM5.23 7.75C6.1 8.62 6.7 9.74 6.91 11H4.07a8.12 8.12 0 0 1 1.16-3.25zM4.07 13h2.84a5.972 5.972 0 0 1-1.68 3.25A8.12 8.12 0 0 1 4.07 13zM11 19.93c-1.73-.22-3.29-1-4.49-2.14A7.952 7.952 0 0 0 8.93 13H11v6.93zM11 11H8.93A7.99 7.99 0 0 0 6.5 6.2 8.035 8.035 0 0 1 11 4.07V11zm8.93 0h-2.84c.21-1.26.81-2.38 1.68-3.25.6.97 1.01 2.07 1.16 3.25zM13 4.07c1.73.22 3.29.99 4.5 2.13a7.99 7.99 0 0 0-2.43 4.8H13V4.07zm0 15.86V13h2.07a8.006 8.006 0 0 0 2.42 4.79A7.988 7.988 0 0 1 13 19.93zm5.77-3.68A6.004 6.004 0 0 1 17.09 13h2.84a8.12 8.12 0 0 1-1.16 3.25z" />
      </SVGIcon>
    );
  }
);
