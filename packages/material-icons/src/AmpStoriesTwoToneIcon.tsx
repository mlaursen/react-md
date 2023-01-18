import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AmpStoriesTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M9 6h6v11H9z" opacity=".3" />
        <path d="M7 19h10V4H7v15zM9 6h6v11H9V6zM3 6h2v11H3zm16 0h2v11h-2z" />
      </SVGIcon>
    );
  }
);
