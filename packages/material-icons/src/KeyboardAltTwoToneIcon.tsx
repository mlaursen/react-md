import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function KeyboardAltTwoToneIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M3 19h18V6H3v13zM17 8h2v2h-2V8zm0 4h2v2h-2v-2zm-4-4h2v2h-2V8zm0 4h2v2h-2v-2zM9 8h2v2H9V8zm0 4h2v2H9v-2zm-1 4h8v1H8v-1zM5 8h2v2H5V8zm0 4h2v2H5v-2z"
          opacity=".3"
        />
        <path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15H3V6h18v13z" />
        <path d="M9 8h2v2H9zM5 8h2v2H5zm3 8h8v1H8zm5-8h2v2h-2zm-4 4h2v2H9zm-4 0h2v2H5zm8 0h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" />
      </SVGIcon>
    );
  }
);
