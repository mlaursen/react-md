import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WebStoriesRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2V4zM2 20c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v16zm19-2c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5v12z" />
      </SVGIcon>
    );
  }
);