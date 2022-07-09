import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function PowerTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m8 13.65 3.5 3.52V19h1v-1.83l3.5-3.51V9H8z" opacity=".3" />
        <path d="M16 7V3h-2v4h-4V3H8v4h-.01C6.89 7 6 7.89 6 8.98v5.52L9.5 18v3h5v-3l3.5-3.5V9c0-1.1-.9-2-2-2zm0 6.66-3.5 3.51V19h-1v-1.83L8 13.65V9h8v4.66z" />
      </SVGIcon>
    );
  }
);
