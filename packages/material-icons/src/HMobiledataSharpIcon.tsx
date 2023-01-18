import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function HMobiledataSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 11H9V7H7v10h2v-4h6v4h2V7h-2v4z" />
      </SVGIcon>
    );
  }
);
