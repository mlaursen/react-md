import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function SystemUpdateAltIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M0 .5h24v24H0z" fill="none" />
        <path d="m12 16.5 4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z" />
      </SVGIcon>
    );
  }
);
