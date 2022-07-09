import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EqualizerTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M16 9h4v11h-4zm-6-5h4v16h-4zm-6 8h4v8H4z" />
      </SVGIcon>
    );
  }
);
