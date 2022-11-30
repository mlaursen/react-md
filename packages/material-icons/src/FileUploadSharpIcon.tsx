import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FileUploadSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M5 10h4v6h6v-6h4l-7-7-7 7zm0 8v2h14v-2H5z" />
      </SVGIcon>
    );
  }
);
