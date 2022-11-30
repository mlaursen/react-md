import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FolderCopySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 6H1v15h19v-2H3z" />
        <path d="M23 4h-9l-2-2H5.01L5 17h18V4z" />
      </SVGIcon>
    );
  }
);
