import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DynamicFeedRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <g fill="none">
          <path d="M0 0h24v24H0z" />
          <path d="M0 0h24v24H0z" />
        </g>
        <path d="M7 8c-.55 0-1 .45-1 1v6c0 1.1.9 2 2 2h8c.55 0 1-.45 1-1s-.45-1-1-1H8V9c0-.55-.45-1-1-1z" />
        <path d="M20 3h-8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-.5 8h-7c-.28 0-.5-.22-.5-.5V7h8v3.5c0 .28-.22.5-.5.5zM3 12c-.55 0-1 .45-1 1v6c0 1.1.9 2 2 2h8c.55 0 1-.45 1-1s-.45-1-1-1H4v-6c0-.55-.45-1-1-1z" />
      </SVGIcon>
    );
  }
);
