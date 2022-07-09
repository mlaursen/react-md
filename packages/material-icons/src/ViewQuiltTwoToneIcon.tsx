import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewQuiltTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M16 12.5h3V16h-3zM6 7h3v9H6zm5 5.5h3V16h-3zM11 7h8v3.5h-8z"
          opacity=".3"
        />
        <path d="M4 5v13h17V5H4zm5 11H6V7h3v9zm5 0h-3v-3.5h3V16zm5 0h-3v-3.5h3V16zm0-5.5h-8V7h8v3.5z" />
      </SVGIcon>
    );
  }
);
