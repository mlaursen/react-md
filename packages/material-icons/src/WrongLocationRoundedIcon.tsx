import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WrongLocationRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <g fill="none">
          <path d="M0 0h24v24H0z" />
          <path d="M0 0h24v24H0z" />
        </g>
        <path d="M14 10V3.26c-.65-.17-1.32-.26-2-.26-4.2 0-8 3.22-8 8.2 0 3.18 2.45 6.92 7.34 11.23.38.33.95.33 1.33 0C17.55 18.12 20 14.38 20 11.2c0-.41-.04-.81-.09-1.2H14zm-2 3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        <path d="m22.54 2.88-1.42-1.42L19 3.59l-2.12-2.13-1.42 1.42L17.59 5l-2.13 2.12 1.42 1.42L19 6.41l2.12 2.13 1.42-1.42L20.41 5z" />
      </SVGIcon>
    );
  }
);
