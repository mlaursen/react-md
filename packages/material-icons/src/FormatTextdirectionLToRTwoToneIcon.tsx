import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatTextdirectionLToRTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9 8V4c-1.1 0-2 .9-2 2s.9 2 2 2z" opacity=".3" />
        <path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm0-6v4c-1.1 0-2-.9-2-2s.9-2 2-2zm12 14-4-4v3H5v2h12v3z" />
      </SVGIcon>
    );
  }
);
