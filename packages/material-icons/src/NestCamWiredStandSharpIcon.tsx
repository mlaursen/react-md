import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/core";
import { SVGIcon } from "@react-md/core";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function NestCamWiredStandSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="m18 .85-6.02.55C8.95 1.7 6.37 4 6.04 7.03a6.362 6.362 0 0 0 5.68 7.04l1.9.19-.56.85c-.88-.19-1.83-.18-2.85.25-2 .85-3.21 2.89-3.21 5.05V23h10v-3c0-1.67-.83-3.15-2.09-4.06l.97-1.45 2.12.23V.85z" />
      </SVGIcon>
    );
  }
);
