import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BrunchDiningIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M18 8h2V4h-2v4zm-2.49 14H2.49c-.27 0-.49-.22-.49-.5V20h14v1.5c0 .28-.22.5-.49.5zM18 15.89l-.4-.42a5.852 5.852 0 0 1-1.6-4V2h6v9.51c0 1.46-.54 2.87-1.53 3.94l-.47.52V20h2v2h-4v-6.11zM7 16v-2h4v2h4.5c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5H7z"
          fillRule="evenodd"
        />
      </SVGIcon>
    );
  }
);