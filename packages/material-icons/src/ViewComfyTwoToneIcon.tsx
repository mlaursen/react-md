import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewComfyTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M10 18h10v-5H10v5zM4 6v5h16V6H4zm0 12h4v-5H4v5z"
          opacity=".3"
        />
        <path d="M2 4v16h20V4H2zm6 14H4v-5h4v5zm12 0H10v-5h10v5zm0-7H4V6h16v5z" />
      </SVGIcon>
    );
  }
);
