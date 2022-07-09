import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function FormatItalicTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 15v3h8v-3h-2.21l3.42-8H18V4h-8v3h2.21l-3.42 8z" />
      </SVGIcon>
    );
  }
);
