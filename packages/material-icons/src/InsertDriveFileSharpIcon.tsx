import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function InsertDriveFileSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4.01 2 4 22h16V8l-6-6H4.01zM13 9V3.5L18.5 9H13z" />
      </SVGIcon>
    );
  }
);
