import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function QueueMusicTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <g fill="none">
          <path d="M0 0h24v24H0z" />
          <path d="M0 0h24v24H0z" />
          <path d="M0 0h24v24H0z" />
        </g>
        <circle cx="16" cy="17" opacity=".3" r="1" />
        <path d="M3 10h12v2H3zm0 4h8v2H3zm0-8h12v2H3z" />
        <path d="M17 14.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5v8.18zM16 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </SVGIcon>
    );
  }
);
