import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LocalMoviesTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10 5h4v14h-4z" opacity=".3" />
        <path d="M20 21V3h-2v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm6 10h-4V5h4v14zm2-12h2v2h-2V7zm0 4h2v2h-2v-2zm0 6v-2h2v2h-2z" />
      </SVGIcon>
    );
  }
);
