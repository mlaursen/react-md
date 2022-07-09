import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TableRowsOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M22 2H2v20h20V2zM4 8V4h16v4H4zm0 6v-4h16v4H4zm0 6v-4h16v4H4z" />
      </SVGIcon>
    );
  }
);
