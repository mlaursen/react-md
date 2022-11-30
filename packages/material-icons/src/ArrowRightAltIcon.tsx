import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ArrowRightAltIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
      </SVGIcon>
    );
  }
);
