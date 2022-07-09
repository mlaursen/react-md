import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TableRowsTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M20 4v4H4V4h16zm0 6v4H4v-4h16zM4 20v-4h16v4H4z" opacity=".3" />
        <path d="M2 2v20h20V2H2zm18 2v4H4V4h16zm0 6v4H4v-4h16zM4 20v-4h16v4H4z" />
      </SVGIcon>
    );
  }
);
