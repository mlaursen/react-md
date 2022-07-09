import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewStreamOutlinedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M4 6v12h17V6H4zm15 10H6v-3h13v3zM6 11V8h13v3H6z" />
      </SVGIcon>
    );
  }
);
