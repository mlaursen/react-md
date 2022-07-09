import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ChangeHistoryTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 7.77 5.61 18h12.78z" opacity=".3" />
        <path d="M12 4 2 20h20L12 4zm0 3.77L18.39 18H5.61L12 7.77z" />
      </SVGIcon>
    );
  }
);
