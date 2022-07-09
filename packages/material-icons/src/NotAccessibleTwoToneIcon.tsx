import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NotAccessibleTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M10 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 9v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.24-.24-.44-.36-.63-.46-.36-.19-.72-.3-1.2-.26-.49.04-.91.27-1.23.61L14 11.05c1.29 1.07 3.25 1.94 5 1.95zm-9 7c-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1a5 5 0 1 0 5.9 5.9h-2.07c-.41 1.16-1.52 2-2.83 2zM2.81 2.81 1.39 4.22 10 12.83V15c0 1.1.9 2 2 2h2.17l5.61 5.61 1.41-1.41L2.81 2.81z" />
      </SVGIcon>
    );
  }
);
