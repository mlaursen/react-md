import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ViewStreamTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M6 13h13v3H6zm0-5h13v3H6z" opacity=".3" />
        <path d="M4 6v12h17V6H4zm15 10H6v-3h13v3zm0-5H6V8h13v3z" />
      </SVGIcon>
    );
  }
);
