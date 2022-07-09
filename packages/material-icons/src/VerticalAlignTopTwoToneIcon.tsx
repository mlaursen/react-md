import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function VerticalAlignTopTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 3h16v2H4zm4 8h3v10h2V11h3l-4-4z" />
      </SVGIcon>
    );
  }
);
