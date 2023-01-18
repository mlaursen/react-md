import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function Battery2BarTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9 6h6v10H9z" opacity=".3" />
        <path d="M17 5v16c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h2V2h4v2h2c.55 0 1 .45 1 1zm-2 1H9v10h6V6z" />
      </SVGIcon>
    );
  }
);
