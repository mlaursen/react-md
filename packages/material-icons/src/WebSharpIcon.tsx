import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(function WebSharpIcon(
  props,
  ref
) {
  return (
    <SVGIcon {...props} ref={ref}>
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
      </g>
      <path d="M22 4H2v16h20V4zM4 9h10.5v3.5H4V9zm0 5.5h10.5V18H4v-3.5zM20 18h-3.5V9H20v9z" />
    </SVGIcon>
  );
});