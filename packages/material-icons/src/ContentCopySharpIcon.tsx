import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ContentCopySharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 1H2v16h2V3h12V1zm5 4H6v18h15V5zm-2 16H8V7h11v14z" />
      </SVGIcon>
    );
  }
);
