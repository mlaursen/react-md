import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SkipPreviousSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
      </SVGIcon>
    );
  }
);
