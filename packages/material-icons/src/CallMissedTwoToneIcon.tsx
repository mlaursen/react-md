import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function CallMissedTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m5 10.41 7 7 9-9L19.59 7 12 14.59 6.41 9H11V7H3v8h2z" />
      </SVGIcon>
    );
  }
);
