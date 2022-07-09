import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ChromeReaderModeIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path
          d="M-74 29h48v48h-48V29zM0 0h24v24H0V0zm0 0h24v24H0V0z"
          fill="none"
        />
        <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z" />
      </SVGIcon>
    );
  }
);
