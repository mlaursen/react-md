import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatSizeTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M3 12h3v7h3v-7h3V9H3zm6-5h5v12h3V7h5V4H9z" />
      </SVGIcon>
    );
  }
);
