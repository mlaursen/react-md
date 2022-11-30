import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AmpStoriesSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 4h10v15H7zM3 6h2v11H3zm16 0h2v11h-2z" />
      </SVGIcon>
    );
  }
);
