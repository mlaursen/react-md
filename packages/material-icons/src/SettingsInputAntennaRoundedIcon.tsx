import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SettingsInputAntennaRoundedIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M12 5c-3.48 0-6.37 2.54-6.91 5.87-.1.59.39 1.13 1 1.13.49 0 .9-.36.98-.85C7.48 8.79 9.53 7 12 7s4.52 1.79 4.93 4.15c.08.49.49.85.98.85.61 0 1.09-.54.99-1.13A6.984 6.984 0 0 0 12 5zm1 9.29a2.518 2.518 0 0 0 1.41-2.99c-.22-.81-.87-1.47-1.68-1.7-1.69-.48-3.23.78-3.23 2.4 0 1.02.62 1.9 1.5 2.29v3.3l-2.71 2.7A.996.996 0 1 0 9.7 21.7l2.3-2.3 2.3 2.3a.996.996 0 1 0 1.41-1.41L13 17.59v-3.3zM12 1C6.3 1 1.61 5.34 1.05 10.9c-.05.59.41 1.1 1 1.1.51 0 .94-.38.99-.88C3.48 6.56 7.33 3 12 3s8.52 3.56 8.96 8.12c.05.5.48.88.99.88.59 0 1.06-.51 1-1.1C22.39 5.34 17.7 1 12 1z" />
      </SVGIcon>
    );
  }
);
