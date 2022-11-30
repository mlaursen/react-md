import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function WebStoriesSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M17 4h2v16h-2V4zM2 2v20h13V2H2zm19 16h1.5V6H21v12z" />
      </SVGIcon>
    );
  }
);
