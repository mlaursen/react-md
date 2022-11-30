import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardOptionKeyTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M15 5h6v2h-6zM9 5H3v2h4.85l6.92 12H21v-2h-5.07z" />
      </SVGIcon>
    );
  }
);
