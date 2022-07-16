import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ImagesearchRollerIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M20 2v6H6V6H4v4h10v5h2v8h-6v-8h2v-3H2V4h4V2" />
      </SVGIcon>
    );
  }
);