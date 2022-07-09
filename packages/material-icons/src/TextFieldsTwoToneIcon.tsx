import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function TextFieldsTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12.5 12h3v7h3v-7h3V9h-9zm3-8h-13v3h5v12h3V7h5z" />
      </SVGIcon>
    );
  }
);
