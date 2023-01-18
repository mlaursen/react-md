import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Select30FpsSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 4v2h5v2H5v2h4v2H4v2h7V4H4zm9 0h7v10h-7V4zm5 2h-3v6h3V6zM5 22H3v-5h2v5zm4 0H7v-5h2v5zm4 0h-2v-5h2v5zm8 0h-6v-5h6v5z" />
      </SVGIcon>
    );
  }
);
