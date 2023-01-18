import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function BrunchDiningRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M18 8h2V4h-2v4zm-3 14H3c-.55 0-1-.45-1-1v-1h14v1c0 .55-.45 1-1 1zm3-6.11-.4-.42a5.788 5.788 0 0 1-1.6-4V3c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v8.51c0 1.46-.54 2.87-1.53 3.94l-.47.52V20h1c.55 0 1 .45 1 1s-.45 1-1 1h-2c-.55 0-1-.45-1-1v-5.11zM7 16v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h4c.55 0 1 .45 1 1v1H2v-1c0-.55.45-1 1-1h4z" />
      </SVGIcon>
    );
  }
);
