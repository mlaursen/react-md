import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LabelImportantSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 18.99h12.04L21 12l-4.97-7H4l5 7-5 6.99z" />
      </SVGIcon>
    );
  }
);
