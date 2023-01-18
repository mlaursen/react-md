import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewCompactAltIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8.5 12.5h-4v-4h4v4zm0-5h-4v-4h4v4zm5 5h-4v-4h4v4zm0-5h-4v-4h4v4z" />
      </SVGIcon>
    );
  }
);
