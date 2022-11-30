import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FolderDeleteSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M22 6v14H2V4h8l2 2h10zm-5.5 4V9h-2v1H12v1.5h1V17h5v-5.5h1V10h-2.5zm0 5.5h-2v-4h2v4z" />
      </SVGIcon>
    );
  }
);
