import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function DocumentScannerSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M7 3H4v3H2V1h5v2zm15 3V1h-5v2h3v3h2zM7 21H4v-3H2v5h5v-2zm13-3v3h-3v2h5v-5h-2zM19 4v16H5V4h14zm-4 4H9v2h6V8zm0 3H9v2h6v-2zm0 3H9v2h6v-2z" />
      </SVGIcon>
    );
  }
);
