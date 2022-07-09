import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ChangeHistoryIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 7.77 18.39 18H5.61L12 7.77M12 4 2 20h20L12 4z" />
      </SVGIcon>
    );
  }
);
