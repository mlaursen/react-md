import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LeaderboardTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M10 5h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z"
          opacity=".3"
        />
        <path d="M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z" />
      </SVGIcon>
    );
  }
);
