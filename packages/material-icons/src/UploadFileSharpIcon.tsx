import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function UploadFileSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M14 2H4v20h16V8l-6-6zm-1 13v4h-2v-4H8l4.01-4L16 15h-3zm0-6V3.5L18.5 9H13z" />
      </SVGIcon>
    );
  }
);
