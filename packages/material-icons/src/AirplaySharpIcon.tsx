import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AirplaySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <g fill="none">
          <path d="M0 0h24v24H0z" />
          <path d="M0 0h24v24H0z" />
          <path d="M0 0h24v24H0z" />
        </g>
        <path d="M6 22h12l-6-6-6 6zM23 3H1v16h6v-2H3V5h18v12h-4v2h6V3z" />
      </SVGIcon>
    );
  }
);
