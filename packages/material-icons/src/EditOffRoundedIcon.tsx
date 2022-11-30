import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function EditOffRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M2.1 3.51a.996.996 0 0 0 0 1.41l6.61 6.61-5.56 5.57c-.1.1-.15.22-.15.36v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15l5.56-5.56 6.61 6.61a.996.996 0 1 0 1.41-1.41L3.52 3.51c-.4-.39-1.03-.39-1.42 0zm18.61 3.53a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zm-9.175 1.67 2.517-2.518L17.8 9.94l-2.517 2.517z" />
      </SVGIcon>
    );
  }
);
