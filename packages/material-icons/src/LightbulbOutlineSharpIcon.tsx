import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function LightbulbOutlineSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 22h6v-2H9v2zm1.54-19.85c-2.75.56-4.94 2.81-5.43 5.58-.51 2.89.76 5.52 2.89 7.01V18h8v-3.26c1.81-1.27 3-3.36 3-5.74 0-4.34-3.97-7.77-8.46-6.85zm4.31 10.95-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
      </SVGIcon>
    );
  }
);
