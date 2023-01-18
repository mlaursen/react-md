import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Up18RatingSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M13 12.5h1.5V14H13zm0-2.5h1.5v1.5H13z" />
        <path d="M21 3H3v18h18V3zM10 15H8.5v-4.5H7V9h3v6zm6-1c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H15c.55 0 1 .45 1 1v4z" />
      </SVGIcon>
    );
  }
);
